import * as THREE from "three";
import { SEGMENT_COLORS } from "../data/figure-colors";

export interface ClusterInfo {
  color: THREE.Color;
  position: THREE.Vector3; // world position on ground plane
  figureIds: number[]; // assigned figure IDs
}

/**
 * Minimal interface for a figure object that ClusterManager can control.
 * The full FigureManager implementation must provide objects satisfying this shape.
 */
export interface FigureProxy {
  id: number;
  position: THREE.Vector3;
  setColor(color: THREE.Color, lerp?: boolean): void;
  setState(state: string): void;
  targetPosition: THREE.Vector3 | null;
}

/**
 * ClusterManager arranges figures into named segment clusters after ICP analysis
 * completes. After a hold period the clusters dissolve and figures return to
 * wandering.
 */
export class ClusterManager {
  private clusters: ClusterInfo[] = [];
  private active: boolean = false;
  private holdTimer: number = 0;
  private holdDuration: number = 18; // seconds before dissolving
  private dissolving: boolean = false;
  private dissolveTimer: number = 0;
  private dissolveDuration: number = 2;

  // Store figure refs so we can reset them on dissolve / reset
  private figureRefs: FigureProxy[] = [];

  /**
   * Divide `figures` into groups, one per segment, and move each group to a
   * position arranged in a circle around the world origin.
   *
   * @param segments - Segment label strings from the ICP analysis.
   * @param figures  - All active figure proxies to distribute.
   */
  formClusters(segments: string[], figures: FigureProxy[]): void {
    if (segments.length === 0 || figures.length === 0) return;

    this.clusters = [];
    this.figureRefs = figures;

    const segmentCount = segments.length;
    // Distribute figures as evenly as possible across segments
    const figuresPerSegment = Math.ceil(figures.length / segmentCount);

    // Cluster positions: circle of radius 9 on the XZ plane, avoiding the
    // centre where the chat widget projection lands.
    const clusterRadius = 9;

    for (let s = 0; s < segmentCount; s++) {
      const angle = (s / segmentCount) * Math.PI * 2 - Math.PI / 2;
      const clusterX = Math.cos(angle) * clusterRadius;
      const clusterZ = Math.sin(angle) * clusterRadius;
      const clusterPos = new THREE.Vector3(clusterX, 0, clusterZ);

      const colorHex = SEGMENT_COLORS[s % SEGMENT_COLORS.length];
      const color = new THREE.Color(colorHex);

      const startIdx = s * figuresPerSegment;
      const endIdx = Math.min(startIdx + figuresPerSegment, figures.length);
      const assignedIds: number[] = [];

      for (let f = startIdx; f < endIdx; f++) {
        const figure = figures[f];
        assignedIds.push(figure.id);

        // Scatter figures within the cluster so they don't stack
        const scatter = 1.5;
        const offsetX = (Math.random() - 0.5) * scatter * 2;
        const offsetZ = (Math.random() - 0.5) * scatter * 2;
        const targetPos = new THREE.Vector3(
          clusterPos.x + offsetX,
          0,
          clusterPos.z + offsetZ
        );

        figure.targetPosition = targetPos;
        figure.setState("clustering");
        figure.setColor(color, true); // lerp to cluster color
      }

      this.clusters.push({
        color,
        position: clusterPos,
        figureIds: assignedIds,
      });
    }

    this.active = true;
    this.dissolving = false;
    this.holdTimer = 0;
    this.dissolveTimer = 0;
  }

  /**
   * Advance cluster lifecycle timers. Call this each frame from the sim loop.
   */
  update(delta: number): void {
    if (!this.active) return;

    if (!this.dissolving) {
      this.holdTimer += delta;
      if (this.holdTimer >= this.holdDuration) {
        this.dissolve();
      }
    } else {
      this.dissolveTimer += delta;
      if (this.dissolveTimer >= this.dissolveDuration) {
        this.active = false;
        // Figures have already been transitioned to wandering in dissolve()
      }
    }
  }

  /**
   * Begin cluster dissolution: return figures to wandering state.
   */
  dissolve(): void {
    this.dissolving = true;
    this.dissolveTimer = 0;

    for (const figure of this.figureRefs) {
      figure.setState("wandering");
      figure.targetPosition = null;
      // Restore a neutral color — using white so the FigureManager can blend
      // back to the figure's original color via its own logic.
      figure.setColor(new THREE.Color(0xffffff), true);
    }

    this.clusters = [];
  }

  getClusters(): ClusterInfo[] {
    return this.clusters;
  }

  isActive(): boolean {
    return this.active;
  }

  isDissolving(): boolean {
    return this.dissolving;
  }

  /**
   * Immediately stop clustering and release all figures.
   */
  reset(): void {
    if (this.active) {
      for (const figure of this.figureRefs) {
        figure.setState("wandering");
        figure.targetPosition = null;
      }
    }
    this.active = false;
    this.dissolving = false;
    this.holdTimer = 0;
    this.dissolveTimer = 0;
    this.clusters = [];
    this.figureRefs = [];
  }
}
