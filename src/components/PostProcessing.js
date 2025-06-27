import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export class PostProcessing {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    
    this.setupComposer();
  }

  setupComposer() {
    this.composer = new EffectComposer(this.renderer);
    
    // Render pass
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);
    
    // Bloom pass
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.7, 0.4, 0.85
    );
    this.composer.addPass(bloomPass);
  }

  render(mirror) {
    // Fix reflection flickering: render mirror before composer
    mirror.visible = true;
    this.renderer.autoClear = true;
    this.renderer.render(this.scene, this.camera); // render once for mirror
    mirror.visible = false;
    this.composer.render(); // then render with postprocessing
    mirror.visible = true;
  }

  resize() {
    this.composer.setSize(window.innerWidth, window.innerHeight);
  }

  getComposer() {
    return this.composer;
  }
} 