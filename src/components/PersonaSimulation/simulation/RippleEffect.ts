import * as THREE from "three";
import type { SimulationUniforms } from "../types";

/**
 * RippleEffect manages the ripple animation on the halftone shader.
 * Expands rippleRadius from 0 to 1 over `duration` seconds (ease-out cubic),
 * then fades rippleActive from 1 to 0 over `fadeDuration` seconds.
 */
export class RippleEffect {
  private uniforms: SimulationUniforms;
  private animating: boolean = false;
  private elapsed: number = 0;
  private duration: number = 1.5; // seconds for expansion
  private fadeDuration: number = 0.5; // seconds for fade-out

  constructor(uniforms: SimulationUniforms) {
    this.uniforms = uniforms;
  }

  /**
   * Start a ripple from the given UV center (defaults to canvas center 0.5, 0.5).
   */
  trigger(centerUV?: { x: number; y: number }): void {
    const cx = centerUV?.x ?? 0.5;
    const cy = centerUV?.y ?? 0.5;

    (this.uniforms.rippleCenter.value as THREE.Vector2).set(cx, cy);
    this.uniforms.rippleRadius.value = 0;
    this.uniforms.rippleActive.value = 1;

    this.elapsed = 0;
    this.animating = true;
  }

  /**
   * Advance the ripple animation by `delta` seconds.
   * Call this each frame from the simulation loop.
   */
  update(delta: number): void {
    if (!this.animating) return;

    this.elapsed += delta;
    const totalDuration = this.duration + this.fadeDuration;

    if (this.elapsed < this.duration) {
      // Expansion phase: ease-out cubic (1 - (1 - t)^3)
      const t = this.elapsed / this.duration;
      const eased = 1 - Math.pow(1 - t, 3);
      this.uniforms.rippleRadius.value = eased;
      this.uniforms.rippleActive.value = 1;
    } else if (this.elapsed < totalDuration) {
      // Fade-out phase: linear fade from 1 to 0
      this.uniforms.rippleRadius.value = 1;
      const fadeT = (this.elapsed - this.duration) / this.fadeDuration;
      this.uniforms.rippleActive.value = 1 - fadeT;
    } else {
      // Done
      this.uniforms.rippleActive.value = 0;
      this.uniforms.rippleRadius.value = 0;
      this.animating = false;
    }
  }

  /**
   * Immediately stop any active ripple animation.
   */
  reset(): void {
    this.animating = false;
    this.elapsed = 0;
    this.uniforms.rippleActive.value = 0;
    this.uniforms.rippleRadius.value = 0;
  }

  isAnimating(): boolean {
    return this.animating;
  }
}
