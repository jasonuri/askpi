import * as THREE from "three";
import type { FigureState } from "../types";

/**
 * Default state timer ranges in seconds [min, max].
 * States without timers are controlled externally.
 */
const STATE_TIMERS: Partial<Record<FigureState, [number, number]>> = {
  wandering: [3, 8],
  idle: [2, 5],
  interacting: [3, 5],
  waving: [2, 2],
  scattering: [1.5, 1.5],
};

/** Default interaction cooldown after leaving `interacting` state. */
const INTERACTION_COOLDOWN = 5;

/**
 * Procedural humanoid figure: capsule body + sphere head.
 * All materials are MeshBasicMaterial (no lighting required).
 */
export class Figure {
  id: number;
  mesh: THREE.Group;
  color: THREE.Color;
  state: FigureState;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  targetPosition: THREE.Vector3 | null;
  stateTimer: number;
  interactionCooldown: number;

  private scene: THREE.Scene;
  private bodyMesh: THREE.Mesh;
  private headMesh: THREE.Mesh;
  private bodyMaterial: THREE.MeshBasicMaterial;
  private headMaterial: THREE.MeshBasicMaterial;

  /** Y offset of the group origin so feet sit at y=0. */
  private static readonly BODY_HEIGHT = 1.2;
  private static readonly HEAD_RADIUS = 0.25;
  /** Center of capsule body above group origin. */
  private static readonly BODY_OFFSET_Y = 0.6; // half of BODY_HEIGHT
  /** Center of head above group origin. */
  private static readonly HEAD_OFFSET_Y = 1.2 + 0.25; // BODY_HEIGHT + HEAD_RADIUS

  constructor(
    id: number,
    color: THREE.Color,
    position: THREE.Vector3,
    scene: THREE.Scene
  ) {
    this.id = id;
    this.color = color.clone();
    this.scene = scene;
    this.position = position.clone();
    this.velocity = new THREE.Vector3();
    this.targetPosition = null;
    this.state = "wandering";
    this.stateTimer = Figure.randomTimer("wandering");
    this.interactionCooldown = 0;

    // Body — CapsuleGeometry: radius, length, capSegments, radialSegments
    const bodyGeometry = new THREE.CapsuleGeometry(0.3, Figure.BODY_HEIGHT, 4, 8);
    this.bodyMaterial = new THREE.MeshBasicMaterial({ color: this.color });
    this.bodyMesh = new THREE.Mesh(bodyGeometry, this.bodyMaterial);
    this.bodyMesh.position.y = Figure.BODY_OFFSET_Y + Figure.HEAD_RADIUS; // capsule center

    // Head — SphereGeometry
    const headGeometry = new THREE.SphereGeometry(Figure.HEAD_RADIUS, 8, 6);
    this.headMaterial = new THREE.MeshBasicMaterial({ color: this.color });
    this.headMesh = new THREE.Mesh(headGeometry, this.headMaterial);
    this.headMesh.position.y = Figure.HEAD_OFFSET_Y + Figure.HEAD_RADIUS * 0.5;

    // Group
    this.mesh = new THREE.Group();
    this.mesh.add(this.bodyMesh);
    this.mesh.add(this.headMesh);
    this.mesh.position.copy(this.position);

    scene.add(this.mesh);
  }

  setState(state: FigureState): void {
    this.state = state;
    this.stateTimer = Figure.randomTimer(state);

    if (state === "interacting") {
      this.interactionCooldown = INTERACTION_COOLDOWN;
    }
  }

  update(delta: number): void {
    // Count down timers
    if (this.stateTimer > 0) {
      this.stateTimer -= delta;
    }

    if (this.interactionCooldown > 0) {
      this.interactionCooldown -= delta;
      if (this.interactionCooldown < 0) this.interactionCooldown = 0;
    }

    // Apply velocity to position (external callers set velocity as appropriate)
    this.position.addScaledVector(this.velocity, delta);

    // Sync group position
    this.mesh.position.set(this.position.x, 0, this.position.z);
  }

  lookAt(target: THREE.Vector3): void {
    const dx = target.x - this.position.x;
    const dz = target.z - this.position.z;
    if (Math.abs(dx) < 0.001 && Math.abs(dz) < 0.001) return;
    this.mesh.rotation.y = Math.atan2(dx, dz);
  }

  setColor(color: THREE.Color, lerp?: boolean): void {
    if (lerp) {
      // Lerp is handled frame-by-frame via a stored target; for simplicity
      // we do an immediate set here. Callers can call this repeatedly with
      // incrementally interpolated values if they want smooth transitions.
      this.color.lerp(color, 0.05);
    } else {
      this.color.copy(color);
    }
    this.bodyMaterial.color.copy(this.color);
    this.headMaterial.color.copy(this.color);
  }

  getHeadWorldPosition(): THREE.Vector3 {
    const wp = new THREE.Vector3();
    this.headMesh.getWorldPosition(wp);
    return wp;
  }

  dispose(): void {
    this.scene.remove(this.mesh);
    this.bodyMesh.geometry.dispose();
    this.headMesh.geometry.dispose();
    this.bodyMaterial.dispose();
    this.headMaterial.dispose();
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────

  static randomTimer(state: FigureState): number {
    const range = STATE_TIMERS[state];
    if (!range) return 0;
    return range[0] + Math.random() * (range[1] - range[0]);
  }
}
