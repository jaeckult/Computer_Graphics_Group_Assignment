import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';

export class Scene {
  constructor(renderer, camera) {
    this.scene = new THREE.Scene();
    this.renderer = renderer;
    this.camera = camera;
    this.textureLoader = new THREE.TextureLoader();
    
    this.setupLighting();
    this.setupMirror();
    this.setupEnvironment();
  }

  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambientLight);

    // Directional light
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(5, 10, 7.5);
    this.scene.add(dirLight);

    // Main spotlight
    const spotlight = new THREE.SpotLight(0xffffff, 100.0, 10, 0.65, 1);
    spotlight.position.set(0, 5, 0);
    spotlight.target.position.set(0, 1, -5);
    this.scene.add(spotlight);
    this.scene.add(spotlight.target);

    // Follow spotlight
    this.followSpot = new THREE.SpotLight(0x00ffff, 1.2, 20, 0.5, 0.7);
    this.scene.add(this.followSpot);
    this.scene.add(this.followSpot.target);

    // Individual artwork spotlights
    for (let i = 0; i < 6; i++) {
      const angle = 2 * Math.PI * (i / 6);
      const x = Math.sin(angle) * 4;
      const z = Math.cos(angle) * 4;
      const spot = new THREE.SpotLight(0xffffff, 1.2, 8, 0.7, 0.8);
      spot.position.set(x, 4, z);
      spot.target.position.set(x, 1, z);
      this.scene.add(spot);
      this.scene.add(spot.target);
    }
  }

  setupMirror() {
    this.mirror = new Reflector(
      new THREE.CircleGeometry(40, 64),
      {
        color: 0x888888,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        clipBias: 0.003,
        shader: undefined,
        encoding: THREE.sRGBEncoding
      }
    );
    this.mirror.position.set(0, -1.05, 0);
    this.mirror.rotateX(-Math.PI / 2);
    this.scene.add(this.mirror);
  }

  setupEnvironment() {
    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({ 
        color: 0x2d1810,
        roughness: 0.3, 
        metalness: 0.1 
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.1;
    this.scene.add(floor);

    // Wall panels
    for (let i = 0; i < 6; i++) {
      const angle = 2 * Math.PI * (i / 6);
      const x = Math.sin(angle) * 4;
      const z = Math.cos(angle) * 4;
      const wall = new THREE.Mesh(
        new THREE.PlaneGeometry(3.5, 2.5),
        new THREE.MeshStandardMaterial({ color: 0x222233, roughness: 0.7, metalness: 0.2 })
      );
      wall.position.set(x, 1, z);
      wall.lookAt(0, 1, 0);
      this.scene.add(wall);
    }

    // Bench
    const bench = new THREE.Group();
    const seat = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 0.2, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x8b5c2a, roughness: 0.6 })
    );
    seat.position.y = 0.3;
    bench.add(seat);
    
    for (let i = -1; i <= 1; i += 2) {
      const leg = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.6, 0.15),
        new THREE.MeshStandardMaterial({ color: 0x5a3a1b, roughness: 0.7 })
      );
      leg.position.set(i * 1.05, 0, 0);
      bench.add(leg);
    }
    
    bench.position.set(0, 0, 0);
    this.scene.add(bench);
  }

  update(camera) {
    // Update follow spotlight
    this.followSpot.position.copy(camera.position);
    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);
    this.followSpot.target.position.copy(camera.position.clone().add(camDir.multiplyScalar(5)));
  }

  getScene() {
    return this.scene;
  }

  getMirror() {
    return this.mirror;
  }
} 