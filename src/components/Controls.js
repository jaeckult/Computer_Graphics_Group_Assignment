import * as THREE from 'three';
import * as TWEEN from 'tween';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { tourPath } from '../utils/constants.js';

export class Controls {
  constructor(camera, renderer) {
    this.camera = camera;
    this.renderer = renderer;
    this.moveSpeed = 0.2;
    this.move = { forward: false, backward: false, left: false, right: false, up: false, down: false };
    this.tourActive = false;
    
    this.setupControls();
    this.setupEventListeners();
  }

  setupControls() {
    // OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enablePan = true;
    this.controls.enableZoom = true;
    this.controls.target.set(0, 1, -5);
    this.controls.update();

    // PointerLockControls
    this.pointerLockControls = new PointerLockControls(this.camera, this.renderer.domElement);

    // Initial camera position
    this.initialCameraPos = new THREE.Vector3(0, 2, 10);
    this.initialCameraTarget = new THREE.Vector3(0, 1, 0);
  }

  setupEventListeners() {
    // Keyboard controls for switching between Orbit and PointerLock
    window.addEventListener('keydown', (e) => {
      if (e.key === 'o' || e.key === 'O') {
        this.controls.enabled = true;
        this.pointerLockControls.unlock();
      } else if (e.key === 'p' || e.key === 'P') {
        this.controls.enabled = false;
        this.pointerLockControls.lock();
      }
    });

    // WASD/Arrow key movement
    window.addEventListener('keydown', (e) => {
      switch (e.key.toLowerCase()) {
        case 'w': case 'arrowup': this.move.forward = true; break;
        case 's': case 'arrowdown': this.move.backward = true; break;
        case 'a': case 'arrowleft': this.move.left = true; break;
        case 'd': case 'arrowright': this.move.right = true; break;
        case 'q': this.move.up = true; break;
        case 'e': this.move.down = true; break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.key.toLowerCase()) {
        case 'w': case 'arrowup': this.move.forward = false; break;
        case 's': case 'arrowdown': this.move.backward = false; break;
        case 'a': case 'arrowleft': this.move.left = false; break;
        case 'd': case 'arrowright': this.move.right = false; break;
        case 'q': this.move.up = false; break;
        case 'e': this.move.down = false; break;
      }
    });

    // Mouse wheel for gallery rotation
    window.addEventListener('wheel', (ev) => {
      // This will be handled by the Gallery component
    });
  }

  updateCameraMovement() {
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    dir.y = 0; 
    dir.normalize();
    const right = new THREE.Vector3().crossVectors(this.camera.up, dir).normalize();
    
    if (this.move.forward) this.camera.position.addScaledVector(dir, this.moveSpeed);
    if (this.move.backward) this.camera.position.addScaledVector(dir, -this.moveSpeed);
    if (this.move.left) this.camera.position.addScaledVector(right, this.moveSpeed);
    if (this.move.right) this.camera.position.addScaledVector(right, -this.moveSpeed);
    if (this.move.up) this.camera.position.y += this.moveSpeed;
    if (this.move.down) this.camera.position.y -= this.moveSpeed;
  }

  resetCamera() {
    this.camera.position.copy(this.initialCameraPos);
    this.controls.target.copy(this.initialCameraTarget);
    this.controls.update();
  }

  runTourStep(i) {
    if (i >= tourPath.length) {
      this.tourActive = false;
      this.controls.enabled = true;
      return;
    }
    const step = tourPath[i];
    new TWEEN.Tween(this.camera.position)
      .to(step.pos, 2500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        this.controls.target.set(step.look.x, step.look.y, step.look.z);
        this.controls.update();
      })
      .onComplete(() => this.runTourStep(i + 1))
      .start();
  }

  startTour() {
    if (this.tourActive) return;
    this.tourActive = true;
    this.controls.enabled = false;
    this.runTourStep(0);
  }

  update() {
    this.updateCameraMovement();
  }

  getControls() {
    return this.controls;
  }

  getPointerLockControls() {
    return this.pointerLockControls;
  }

  isTourActive() {
    return this.tourActive;
  }
} 