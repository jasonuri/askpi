import type * as THREE from "three";

export interface Vec2 {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type SimPhase = "idle" | "analyzing" | "clustering" | "complete";

export type FigureState =
  | "wandering"
  | "idle"
  | "interacting"
  | "waving"
  | "scattering"
  | "drifting-to-center"
  | "clustering";

export interface FigureConfig {
  color: string;
  position: THREE.Vector3;
  modelIndex: number;
}

export interface SegmentData {
  name: string;
  color: string;
}

export interface ResponsiveConfig {
  figureCount: number;
  gridSize: number;
  enableMouse: boolean;
  mouseMode: "full" | "look-only" | "tap";
  enableSpeechBubbles: boolean;
  maxVisibleBubbles: number;
}

export interface SimulationUniforms {
  [key: string]: { value: unknown };
  tScene: { value: THREE.Texture | null };
  resolution: { value: THREE.Vector2 };
  gridSize: { value: number };
  dotMinRadius: { value: number };
  dotMaxRadius: { value: number };
  backgroundDotAlpha: { value: number };
  backgroundColor: { value: THREE.Vector3 };
  rippleCenter: { value: THREE.Vector2 };
  rippleRadius: { value: number };
  rippleActive: { value: number };
  rippleWidth: { value: number };
}
