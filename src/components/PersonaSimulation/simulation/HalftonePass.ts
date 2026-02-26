import * as THREE from "three";
import type { SimulationUniforms } from "../types";

// Inline shaders to avoid raw file loading issues with Next.js
const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform sampler2D tScene;
uniform vec2 resolution;
uniform float gridSize;
uniform float dotMinRadius;
uniform float dotMaxRadius;
uniform float backgroundDotAlpha;
uniform vec3 backgroundColor;

// Ripple uniforms
uniform vec2 rippleCenter;
uniform float rippleRadius;
uniform float rippleActive;
uniform float rippleWidth;

varying vec2 vUv;

void main() {
  vec2 pixelCoord = vUv * resolution;

  vec2 cellIndex = floor(pixelCoord / gridSize);
  vec2 cellCenter = (cellIndex + 0.5) * gridSize;

  vec2 sampleUv = cellCenter / resolution;

  vec4 sceneColor = texture2D(tScene, sampleUv);

  float luminance = dot(sceneColor.rgb, vec3(0.299, 0.587, 0.114));
  float sceneAlpha = sceneColor.a;

  float dist = length(pixelCoord - cellCenter);

  float dotRadius;
  vec3 dotColor;
  float dotAlpha;

  if (sceneAlpha > 0.1) {
    dotRadius = mix(dotMinRadius, dotMaxRadius, luminance);
    dotColor = sceneColor.rgb;
    dotAlpha = 1.0;
  } else {
    dotRadius = dotMinRadius * 0.8;
    dotColor = vec3(0.75);
    dotAlpha = backgroundDotAlpha;
  }

  if (rippleActive > 0.5) {
    vec2 ripplePos = rippleCenter * resolution;
    float rippleDist = length(cellCenter - ripplePos);
    float rippleEdge = rippleRadius * max(resolution.x, resolution.y);
    float rippleBand = smoothstep(rippleEdge - rippleWidth * 0.5, rippleEdge, rippleDist)
                     * (1.0 - smoothstep(rippleEdge, rippleEdge + rippleWidth * 0.5, rippleDist));
    dotAlpha = max(dotAlpha, rippleBand * 0.6);
    dotRadius = max(dotRadius, dotMinRadius + rippleBand * (dotMaxRadius - dotMinRadius) * 0.5);
  }

  float circle = 1.0 - smoothstep(dotRadius - 0.8, dotRadius + 0.8, dist);

  vec3 finalColor = backgroundColor;
  finalColor = mix(finalColor, dotColor, circle * dotAlpha);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export class HalftonePass {
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  uniforms: SimulationUniforms;
  private quad: THREE.Mesh;

  constructor(sceneTexture: THREE.Texture, width: number, height: number) {
    const pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Background color: #FAFAFA (site bg) normalized to [0, 1]
    const bgColor = new THREE.Color(0xfafafa);

    this.uniforms = {
      tScene: { value: sceneTexture },
      resolution: { value: new THREE.Vector2(width * pixelRatio, height * pixelRatio) },
      gridSize: { value: 8.0 },
      dotMinRadius: { value: 1.2 },
      dotMaxRadius: { value: 3.2 },
      backgroundDotAlpha: { value: 0.08 },
      backgroundColor: { value: new THREE.Vector3(bgColor.r, bgColor.g, bgColor.b) },
      rippleCenter: { value: new THREE.Vector2(0.5, 0.5) },
      rippleRadius: { value: 0.0 },
      rippleActive: { value: 0.0 },
      rippleWidth: { value: 40.0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: this.uniforms,
      depthTest: false,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    this.quad = new THREE.Mesh(geometry, material);

    this.scene = new THREE.Scene();
    this.scene.add(this.quad);

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  }

  resize(width: number, height: number): void {
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.uniforms.resolution.value.set(width * pixelRatio, height * pixelRatio);
  }

  setGridSize(size: number): void {
    this.uniforms.gridSize.value = size;
    // Scale dot sizes relative to grid
    this.uniforms.dotMinRadius.value = size * 0.15;
    this.uniforms.dotMaxRadius.value = size * 0.4;
  }

  render(renderer: THREE.WebGLRenderer): void {
    renderer.render(this.scene, this.camera);
  }

  dispose(): void {
    (this.quad.geometry as THREE.BufferGeometry).dispose();
    (this.quad.material as THREE.Material).dispose();
  }
}
