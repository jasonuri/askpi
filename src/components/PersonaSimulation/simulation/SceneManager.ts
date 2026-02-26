import * as THREE from "three";
import type { Rect } from "../types";

export class SceneManager {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderTarget: THREE.WebGLRenderTarget;
  groundPlane: THREE.Mesh;
  raycaster: THREE.Raycaster;
  clock: THREE.Clock;

  private width: number;
  private height: number;

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this.width = width;
    this.height = height;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0);

    // Scene
    this.scene = new THREE.Scene();

    // Camera — slight overhead angle
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 15, 20);
    this.camera.lookAt(0, 0, 0);

    // Offscreen render target
    this.renderTarget = new THREE.WebGLRenderTarget(
      width * pixelRatio,
      height * pixelRatio,
      {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
      }
    );

    // Invisible ground plane for raycasting
    const groundGeometry = new THREE.PlaneGeometry(40, 30);
    const groundMaterial = new THREE.MeshBasicMaterial({ visible: false });
    this.groundPlane = new THREE.Mesh(groundGeometry, groundMaterial);
    this.groundPlane.rotation.x = -Math.PI / 2;
    this.groundPlane.position.y = 0;
    this.scene.add(this.groundPlane);

    // Raycaster
    this.raycaster = new THREE.Raycaster();

    // Clock
    this.clock = new THREE.Clock();
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;

    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderTarget.setSize(width * pixelRatio, height * pixelRatio);
  }

  renderToTarget(): void {
    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);
  }

  /**
   * Convert a screen-space rect (from DOM) to a 3D ground-plane bounding box.
   * Returns { min: Vector3, max: Vector3 } in world space on the ground plane (y=0).
   */
  screenRectToGroundBounds(rect: Rect): { min: THREE.Vector3; max: THREE.Vector3 } | null {
    const corners = [
      new THREE.Vector2(
        (rect.x / this.width) * 2 - 1,
        -((rect.y) / this.height) * 2 + 1
      ),
      new THREE.Vector2(
        ((rect.x + rect.width) / this.width) * 2 - 1,
        -((rect.y + rect.height) / this.height) * 2 + 1
      ),
    ];

    const results: THREE.Vector3[] = [];
    for (const ndc of corners) {
      this.raycaster.setFromCamera(ndc, this.camera);
      const intersects = this.raycaster.intersectObject(this.groundPlane);
      if (intersects.length > 0) {
        results.push(intersects[0].point.clone());
      }
    }

    if (results.length < 2) return null;

    return {
      min: new THREE.Vector3(
        Math.min(results[0].x, results[1].x),
        0,
        Math.min(results[0].z, results[1].z)
      ),
      max: new THREE.Vector3(
        Math.max(results[0].x, results[1].x),
        0,
        Math.max(results[0].z, results[1].z)
      ),
    };
  }

  /**
   * Convert screen coordinates to a point on the ground plane.
   */
  screenToGround(screenX: number, screenY: number): THREE.Vector3 | null {
    const ndc = new THREE.Vector2(
      (screenX / this.width) * 2 - 1,
      -(screenY / this.height) * 2 + 1
    );
    this.raycaster.setFromCamera(ndc, this.camera);
    const intersects = this.raycaster.intersectObject(this.groundPlane);
    if (intersects.length > 0) {
      return intersects[0].point.clone();
    }
    return null;
  }

  dispose(): void {
    this.renderTarget.dispose();
    (this.groundPlane.geometry as THREE.BufferGeometry).dispose();
    (this.groundPlane.material as THREE.Material).dispose();
    this.renderer.dispose();
  }
}
