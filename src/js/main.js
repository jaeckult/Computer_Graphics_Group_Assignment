import * as THREE from 'three';
import * as TWEEN from 'tween';
import { UI } from '../components/UI.js';
import { Gallery } from '../components/Gallery.js';
import { Scene } from '../components/Scene.js';
import { Controls } from '../components/Controls.js';
import { PostProcessing } from '../components/PostProcessing.js';

class ArtGallery {
  constructor() {
    this.setupRenderer();
    this.setupCamera();
    this.setupComponents();
    this.setupEventListeners();
    this.animate();
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 2;
    document.body.appendChild(this.renderer.domElement);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 2, 10);
    this.camera.lookAt(0, 1, 0);
  }

  setupComponents() {
    // Initialize UI
    this.ui = new UI();
    
    // Initialize 3D scene
    this.scene = new Scene(this.renderer, this.camera);
    this.threeScene = this.scene.getScene();
    
    // Initialize gallery
    this.gallery = new Gallery(this.threeScene, this.scene.textureLoader);
    
    // Initialize controls
    this.controls = new Controls(this.camera, this.renderer);
    
    // Initialize post-processing
    this.postProcessing = new PostProcessing(this.renderer, this.threeScene, this.camera);
    
    // Setup button event listeners
    this.setupButtonListeners();
    
    // Set initial title and artist
    document.getElementById('title').innerText = 'I IN THE OTHER';
    document.getElementById('artist').innerText = 'Aida Muluneh';
  }

  setupButtonListeners() {
    const resetBtn = document.getElementById('reset-camera-btn');
    const tourBtn = document.getElementById('take-tour-btn');
    
    resetBtn.onclick = () => {
      this.controls.resetCamera();
    };
    
    tourBtn.onclick = () => {
      this.controls.startTour();
    };
  }

  setupEventListeners() {
    // Mouse events for gallery interaction
    window.addEventListener('mousemove', (ev) => {
      const intersects = this.getMouseIntersects(ev);
      this.gallery.handleHover(intersects, this.ui);
    });

    window.addEventListener('click', (ev) => {
      const intersects = this.getMouseIntersects(ev);
      this.gallery.handleClick(intersects, this.ui);
    });

    // Mouse wheel for gallery rotation
    window.addEventListener('wheel', (ev) => {
      const galleryRoot = this.gallery.getRoot();
      galleryRoot.rotation.y += ev.wheelDelta * 0.0001;
    });

    // Window resize
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.postProcessing.resize();
      
      const mirror = this.scene.getMirror();
      mirror.getRenderTarget().setSize(
        window.innerWidth * window.devicePixelRatio,
        window.innerHeight * window.devicePixelRatio
      );
    });
  }

  getMouseIntersects(event) {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);
    const galleryRoot = this.gallery.getRoot();
    return raycaster.intersectObjects(galleryRoot.children, true);
  }

  animate() {
    TWEEN.update();
    
    // Update controls
    this.controls.update();
    
    // Update scene (physics, animations, etc.)
    this.scene.update(this.camera);
    
    // Update UI
    this.ui.updateCameraInfo(this.camera);
    
    // Render with post-processing
    const mirror = this.scene.getMirror();
    this.postProcessing.render(mirror);
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize the application
new ArtGallery(); 