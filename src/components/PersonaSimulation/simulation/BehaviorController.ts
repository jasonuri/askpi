import * as THREE from "three";
import type { Figure } from "./Figure";

export interface ExclusionZone {
  min: THREE.Vector3;
  max: THREE.Vector3;
}

export interface GroundBounds {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

/** Normalised radius inside which figures receive an outward push during wandering. */
const CENTER_AVOID_RADIUS_NORM = 0.5;

/** Maximum fractional strength of the outward nudge at the exact centre. */
const CENTER_AVOID_STRENGTH = 0.8;

/**
 * Stateless behavior helpers. FigureManager delegates movement logic here
 * so the files stay focused and testable independently.
 */
export class BehaviorController {
  /**
   * Advance a wandering figure: move it, steer away from ground boundaries,
   * and deflect around the exclusion zone if one is set.
   */
  updateWandering(
    figure: Figure,
    _delta: number,
    groundBounds: GroundBounds,
    exclusionZone: ExclusionZone | null
  ): void {
    const margin = 1.0;
    const pos = figure.position;
    const vel = figure.velocity;

    // Boundary avoidance — steer toward center
    let bounced = false;
    if (pos.x < groundBounds.minX + margin && vel.x < 0) {
      vel.x = Math.abs(vel.x) + Math.random() * 0.3;
      bounced = true;
    } else if (pos.x > groundBounds.maxX - margin && vel.x > 0) {
      vel.x = -(Math.abs(vel.x) + Math.random() * 0.3);
      bounced = true;
    }

    if (pos.z < groundBounds.minZ + margin && vel.z < 0) {
      vel.z = Math.abs(vel.z) + Math.random() * 0.3;
      bounced = true;
    } else if (pos.z > groundBounds.maxZ - margin && vel.z > 0) {
      vel.z = -(Math.abs(vel.z) + Math.random() * 0.3);
      bounced = true;
    }

    if (bounced) {
      // Re-normalise to preserve speed after reflection
      const speed = vel.length();
      if (speed > 0.001) vel.normalize().multiplyScalar(speed);
    }

    // Soft outward push — prevents figures drifting back to the centre
    this.applyCenterAvoidance(pos, vel, groundBounds);

    // Exclusion zone deflection
    if (exclusionZone && this.isApproachingZone(pos, vel, exclusionZone)) {
      this.deflectFromZone(pos, vel, exclusionZone);
    }

    // Orient figure toward its movement direction
    if (vel.lengthSq() > 0.001) {
      figure.lookAt(
        new THREE.Vector3(pos.x + vel.x, 0, pos.z + vel.z)
      );
    }
  }

  /**
   * Move figure away from `awayFrom` quickly.
   */
  updateScattering(
    figure: Figure,
    _delta: number,
    awayFrom: THREE.Vector3
  ): void {
    const dir = new THREE.Vector3()
      .subVectors(figure.position, awayFrom)
      .setY(0);
    if (dir.lengthSq() > 0.001) {
      dir.normalize();
      const speed = 2.5;
      figure.velocity.set(dir.x * speed, 0, dir.z * speed);
      figure.lookAt(
        new THREE.Vector3(
          figure.position.x + dir.x,
          0,
          figure.position.z + dir.z
        )
      );
    }
  }

  /**
   * Slowly drift toward a center target.
   */
  updateDrifting(
    figure: Figure,
    _delta: number,
    centerTarget: THREE.Vector3
  ): void {
    const dir = new THREE.Vector3()
      .subVectors(centerTarget, figure.position)
      .setY(0);
    const dist = dir.length();
    if (dist > 0.1) {
      dir.normalize();
      const speed = Math.min(dist * 0.5, 1.0);
      figure.velocity.set(dir.x * speed, 0, dir.z * speed);
      figure.lookAt(centerTarget);
    } else {
      figure.velocity.set(0, 0, 0);
    }
  }

  /**
   * Move toward an assigned cluster position.
   */
  updateClustering(
    figure: Figure,
    _delta: number,
    clusterPosition: THREE.Vector3
  ): void {
    const dir = new THREE.Vector3()
      .subVectors(clusterPosition, figure.position)
      .setY(0);
    const dist = dir.length();
    if (dist > 0.15) {
      dir.normalize();
      const speed = Math.min(dist * 0.8, 1.5);
      figure.velocity.set(dir.x * speed, 0, dir.z * speed);
      figure.lookAt(clusterPosition);
    } else {
      figure.velocity.set(0, 0, 0);
      figure.position.copy(clusterPosition).setY(0);
    }
  }

  /** Random normalised direction on the XZ plane. */
  pickRandomDirection(): THREE.Vector3 {
    const angle = Math.random() * Math.PI * 2;
    return new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
  }

  /** Returns true if the position is inside the exclusion zone AABB. */
  isInExclusionZone(position: THREE.Vector3, zone: ExclusionZone): boolean {
    return (
      position.x >= zone.min.x &&
      position.x <= zone.max.x &&
      position.z >= zone.min.z &&
      position.z <= zone.max.z
    );
  }

  /**
   * Redirect velocity to avoid the exclusion zone.
   * Modifies `velocity` in-place.
   */
  deflectFromZone(
    position: THREE.Vector3,
    velocity: THREE.Vector3,
    zone: ExclusionZone
  ): void {
    // Compute the closest point on the zone boundary
    const cx = Math.max(zone.min.x, Math.min(zone.max.x, position.x));
    const cz = Math.max(zone.min.z, Math.min(zone.max.z, position.z));

    // Normal pointing away from the zone center
    const centerX = (zone.min.x + zone.max.x) * 0.5;
    const centerZ = (zone.min.z + zone.max.z) * 0.5;
    const nx = position.x - centerX;
    const nz = position.z - centerZ;
    const len = Math.sqrt(nx * nx + nz * nz) || 1;

    // Remove velocity component pointing into the zone
    const dot = (velocity.x * nx + velocity.z * nz) / len;
    if (dot < 0) {
      velocity.x -= (dot * nx) / len;
      velocity.z -= (dot * nz) / len;

      // Preserve original speed
      const speed = velocity.length();
      if (speed > 0.001) {
        const originalSpeed = Math.sqrt(
          velocity.x * velocity.x + velocity.z * velocity.z
        );
        if (originalSpeed > 0.001) velocity.normalize().multiplyScalar(speed);
      }
    }

    // Suppress unused variable warning
    void cx;
    void cz;
  }

  // ── Private helpers ──────────────────────────────────────────────────────────

  /**
   * Nudges a wandering figure's velocity outward when it drifts inside the
   * central avoidance radius.  The push is purely directional — the original
   * speed is preserved so the figure doesn't accelerate.
   */
  private applyCenterAvoidance(
    pos: THREE.Vector3,
    vel: THREE.Vector3,
    bounds: GroundBounds
  ): void {
    const halfX = (bounds.maxX - bounds.minX) / 2;
    const halfZ = (bounds.maxZ - bounds.minZ) / 2;

    // Normalise position to [-1, 1] space
    const nx = pos.x / halfX;
    const nz = pos.z / halfZ;
    const normDist = Math.sqrt(nx * nx + nz * nz);

    if (normDist >= CENTER_AVOID_RADIUS_NORM) return;

    // Outward direction from origin (handle the degenerate zero case)
    let outX: number;
    let outZ: number;
    if (normDist < 0.0001) {
      const angle = Math.random() * Math.PI * 2;
      outX = Math.cos(angle);
      outZ = Math.sin(angle);
    } else {
      outX = nx / normDist;
      outZ = nz / normDist;
    }

    // Strength scales linearly: full at centre, zero at the avoidance radius
    const strength = CENTER_AVOID_STRENGTH * (1 - normDist / CENTER_AVOID_RADIUS_NORM);

    const currentSpeed = vel.length();

    vel.x += outX * strength;
    vel.z += outZ * strength;

    // Redirect without changing speed
    if (currentSpeed > 0.001) {
      vel.normalize().multiplyScalar(currentSpeed);
    }
  }

  /**
   * Returns true if the figure's current velocity would carry it into the zone
   * within the next ~0.5 s.
   */
  private isApproachingZone(
    position: THREE.Vector3,
    velocity: THREE.Vector3,
    zone: ExclusionZone
  ): boolean {
    const lookahead = 0.5;
    const nx = position.x + velocity.x * lookahead;
    const nz = position.z + velocity.z * lookahead;
    return (
      nx >= zone.min.x &&
      nx <= zone.max.x &&
      nz >= zone.min.z &&
      nz <= zone.max.z
    );
  }
}
