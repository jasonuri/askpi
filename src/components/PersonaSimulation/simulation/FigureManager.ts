import * as THREE from "three";
import { Figure } from "./Figure";
import { BehaviorController } from "./BehaviorController";
import type { ExclusionZone, GroundBounds } from "./BehaviorController";
import { FIGURE_COLORS } from "../data/figure-colors";

/** Maximum simultaneous interacting pairs. */
const MAX_INTERACTING_PAIRS = 4;

/** Distance threshold for triggering figure-figure interaction. */
const INTERACTION_DISTANCE = 2.0;

/** Wandering speed range [min, max] in world units per second. */
const WANDER_SPEED_MIN = 0.5;
const WANDER_SPEED_MAX = 1.0;

const GROUND_BOUNDS: GroundBounds = {
  minX: -16,
  maxX: 16,
  minZ: -10,
  maxZ: 10,
};

/**
 * Manages the pool of Figure instances, delegates per-frame behavior to
 * BehaviorController, and handles figure-figure interaction (Phase 3A).
 *
 * The animation loop calls ONLY `update(delta)` — everything else is internal.
 */
export class FigureManager {
  figures: Figure[] = [];

  private scene: THREE.Scene;
  private behavior = new BehaviorController();
  private exclusionZone: ExclusionZone | null = null;
  private interactingPairCount = 0;
  private nextId = 0;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  // ── Public API ───────────────────────────────────────────────────────────────

  spawn(count: number): void {
    this.clear();
    for (let i = 0; i < count; i++) {
      this.addFigure();
    }
  }

  /**
   * Main update — called once per animation frame.
   * Handles all state transitions, movement, and interactions.
   */
  update(delta: number): void {
    // Clamp delta to avoid huge jumps after tab switch
    const dt = Math.min(delta, 0.1);

    // State machine + movement per figure
    for (const fig of this.figures) {
      this.updateFigure(fig, dt);
    }

    // Figure-figure proximity interaction (O(n²) — acceptable for ≤30 figures)
    this.checkInteractions();
  }

  setTargetCount(count: number): void {
    if (count === this.figures.length) return;
    if (count > this.figures.length) {
      const toAdd = count - this.figures.length;
      for (let i = 0; i < toAdd; i++) this.addFigure();
    } else {
      const toRemove = this.figures.length - count;
      for (let i = 0; i < toRemove; i++) {
        const fig = this.figures.pop();
        if (fig) fig.dispose();
      }
    }
  }

  getFigures(): Figure[] {
    return this.figures;
  }

  /**
   * Set an exclusion zone (in world space) that figures will steer around.
   * Pass null to clear.
   */
  setExclusionZone(
    bounds: { min: THREE.Vector3; max: THREE.Vector3 } | null
  ): void {
    this.exclusionZone = bounds;
  }

  clear(): void {
    for (const fig of this.figures) fig.dispose();
    this.figures = [];
    this.interactingPairCount = 0;
  }

  dispose(): void {
    this.clear();
  }

  // ── Private: per-figure state machine ───────────────────────────────────────

  private updateFigure(fig: Figure, dt: number): void {
    switch (fig.state) {
      case "wandering":
        this.behavior.updateWandering(
          fig,
          dt,
          GROUND_BOUNDS,
          this.exclusionZone
        );
        // Timer expired → go idle
        if (fig.stateTimer <= 0) {
          this.enterIdle(fig);
        }
        break;

      case "idle":
        // Stand still
        fig.velocity.set(0, 0, 0);
        if (fig.stateTimer <= 0) {
          this.enterWandering(fig);
        }
        break;

      case "interacting":
        // Stand still, face partner (partner reference not stored — already set)
        fig.velocity.set(0, 0, 0);
        if (fig.stateTimer <= 0) {
          this.interactingPairCount = Math.max(0, this.interactingPairCount - 1);
          this.enterWandering(fig);
        }
        break;

      case "waving":
        fig.velocity.set(0, 0, 0);
        if (fig.stateTimer <= 0) {
          this.enterWandering(fig);
        }
        break;

      case "scattering":
        // updateScattering sets velocity each frame from an origin point.
        // Since we don't store the scatter origin, just let it run out
        // and rely on whoever triggered scatter to have set velocity already.
        if (fig.stateTimer <= 0) {
          this.enterWandering(fig);
        }
        break;

      case "drifting-to-center":
        this.behavior.updateDrifting(
          fig,
          dt,
          new THREE.Vector3(0, 0, 0)
        );
        break;

      case "clustering":
        // Cluster position set externally via targetPosition
        if (fig.targetPosition) {
          this.behavior.updateClustering(fig, dt, fig.targetPosition);
        }
        break;
    }

    // Apply velocity
    fig.update(dt);
  }

  // ── Private: interaction checks ─────────────────────────────────────────────

  private checkInteractions(): void {
    if (this.interactingPairCount >= MAX_INTERACTING_PAIRS) return;

    for (let i = 0; i < this.figures.length; i++) {
      const a = this.figures[i];
      if (!this.canInteract(a)) continue;

      for (let j = i + 1; j < this.figures.length; j++) {
        const b = this.figures[j];
        if (!this.canInteract(b)) continue;

        const dist = a.position.distanceTo(b.position);
        if (dist < INTERACTION_DISTANCE) {
          this.startInteraction(a, b);
          this.interactingPairCount++;
          if (this.interactingPairCount >= MAX_INTERACTING_PAIRS) return;
        }
      }
    }
  }

  private canInteract(fig: Figure): boolean {
    return (
      (fig.state === "wandering" || fig.state === "idle") &&
      fig.interactionCooldown <= 0
    );
  }

  private startInteraction(a: Figure, b: Figure): void {
    a.setState("interacting");
    b.setState("interacting");
    // Face each other
    a.lookAt(b.position);
    b.lookAt(a.position);
    // Stop movement
    a.velocity.set(0, 0, 0);
    b.velocity.set(0, 0, 0);
  }

  // ── Private: state entry helpers ─────────────────────────────────────────────

  private enterWandering(fig: Figure): void {
    fig.setState("wandering");
    const dir = this.behavior.pickRandomDirection();
    const speed = WANDER_SPEED_MIN + Math.random() * (WANDER_SPEED_MAX - WANDER_SPEED_MIN);
    fig.velocity.set(dir.x * speed, 0, dir.z * speed);
  }

  private enterIdle(fig: Figure): void {
    fig.setState("idle");
    fig.velocity.set(0, 0, 0);
  }

  // ── Private: spawn helpers ───────────────────────────────────────────────────

  private addFigure(): void {
    const id = this.nextId++;
    const colorHex = FIGURE_COLORS[id % FIGURE_COLORS.length];
    const color = new THREE.Color(colorHex);

    const position = this.randomRingPosition();

    const fig = new Figure(id, color, position, this.scene);

    // Give each figure an initial wander direction and randomised state timer
    const dir = this.behavior.pickRandomDirection();
    const speed = WANDER_SPEED_MIN + Math.random() * (WANDER_SPEED_MAX - WANDER_SPEED_MIN);
    fig.velocity.set(dir.x * speed, 0, dir.z * speed);

    this.figures.push(fig);
  }

  /**
   * Area-weighted annular spawn — places figures in a ring in the outer
   * portion of the ground plane so the centre stays clear for the widget.
   *
   * Works in normalised [-1,1] space (matching the elliptical aspect ratio)
   * then scales back to world coordinates.
   */
  private randomRingPosition(): THREE.Vector3 {
    const RING_RADIUS_MIN_NORM = 0.55;
    const RING_RADIUS_MAX_NORM = 0.92;

    const rMin = RING_RADIUS_MIN_NORM;
    const rMax = RING_RADIUS_MAX_NORM;

    // Area-weighted sampling prevents pileup at the inner edge
    const u = Math.random();
    const r = Math.sqrt(u * (rMax * rMax - rMin * rMin) + rMin * rMin);

    const angle = Math.random() * Math.PI * 2;
    const nx = r * Math.cos(angle); // normalised x in [-1, 1]
    const nz = r * Math.sin(angle); // normalised z in [-1, 1]

    // Scale to world space using ground half-extents
    const halfX = (GROUND_BOUNDS.maxX - GROUND_BOUNDS.minX) / 2; // 16
    const halfZ = (GROUND_BOUNDS.maxZ - GROUND_BOUNDS.minZ) / 2; // 10

    const x = Math.max(GROUND_BOUNDS.minX, Math.min(GROUND_BOUNDS.maxX, nx * halfX));
    const z = Math.max(GROUND_BOUNDS.minZ, Math.min(GROUND_BOUNDS.maxZ, nz * halfZ));

    return new THREE.Vector3(x, 0, z);
  }
}
