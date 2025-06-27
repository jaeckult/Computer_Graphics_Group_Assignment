import * as THREE from 'three';
import * as TWEEN from 'tween';
import { images, titles, artists } from '../utils/constants.js';

export class Gallery {
  constructor(scene, textureLoader) {
    this.scene = scene;
    this.textureLoader = textureLoader;
    this.count = 6;
    this.root = new THREE.Object3D();
    this.scene.add(this.root);
    this.currentlyHoveredArtwork = null;
    this.lastTween = null;
    
    this.createGallery();
  }

  createGallery() {
    const leftArrowImage = this.textureLoader.load(`left.png`);
    const rightArrowImage = this.textureLoader.load(`right.png`);

    for (let i = 0; i < this.count; i++) {
      const image = this.textureLoader.load(images[i]);

      const baseNode = new THREE.Object3D();
      baseNode.rotation.y = 2 * Math.PI * (i / this.count);

      const border = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 2.2, 0.005),
        new THREE.MeshStandardMaterial({ color: 0x303030 })
      );
      border.position.z = -4;
      baseNode.add(border);

      const artwork = new THREE.Mesh(
        new THREE.BoxGeometry(3, 2, 0.01),
        new THREE.MeshStandardMaterial({ map: image })
      );
      artwork.position.z = -4;
      artwork.userData = i;
      baseNode.add(artwork);

      const leftArrow = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.3, 0.01),
        new THREE.MeshStandardMaterial({ map: leftArrowImage, transparent: true })
      );
      leftArrow.name = 'left';
      leftArrow.userData = i;
      leftArrow.position.set(2.9, 0, -4);
      baseNode.add(leftArrow);

      const rightArrow = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.3, 0.01),
        new THREE.MeshStandardMaterial({ map: rightArrowImage, transparent: true })
      );
      rightArrow.name = 'right';
      rightArrow.userData = i;
      rightArrow.position.set(-2.9, 0, -4);
      baseNode.add(rightArrow);

      this.root.add(baseNode);
    }
  }

  enlargeArtwork(mesh) {
    if (this.lastTween) this.lastTween.stop();
    this.lastTween = new TWEEN.Tween(mesh.scale)
      .to({ x: 1.2, y: 1.2, z: 1.2 }, 300)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  }

  resetArtwork(mesh) {
    if (this.lastTween) this.lastTween.stop();
    this.lastTween = new TWEEN.Tween(mesh.scale)
      .to({ x: 1, y: 1, z: 1 }, 300)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  }

  handleHover(intersects, ui) {
    let hoveredArtwork = null;
    let idx = undefined;

    if (intersects.length > 0) {
      const obj = intersects[0].object;
      // Find the artwork mesh (the one with geometry of 3x2)
      let artworkMesh = obj;
      while (artworkMesh && !(artworkMesh.geometry && artworkMesh.geometry.parameters && artworkMesh.geometry.parameters.width === 3 && artworkMesh.geometry.parameters.height === 2)) {
        artworkMesh = artworkMesh.parent;
      }
      if (artworkMesh && typeof artworkMesh.userData === 'number') {
        hoveredArtwork = artworkMesh;
        idx = artworkMesh.userData;
      } else if (obj.name === '') {
        idx = obj.parent.parent ? obj.parent.parent.userData : obj.userData;
      } else if (obj.name !== 'left' && obj.name !== 'right') {
        idx = obj.userData;
      }
      if (typeof idx === 'number' && idx >= 0 && idx < 6) {
        ui.showDescription(idx);
      } else {
        ui.hideDescription();
      }
    } else {
      ui.hideDescription();
    }

    // Handle hover effect
    if (this.currentlyHoveredArtwork && this.currentlyHoveredArtwork !== hoveredArtwork) {
      this.resetArtwork(this.currentlyHoveredArtwork);
      this.currentlyHoveredArtwork = null;
    }
    if (hoveredArtwork && this.currentlyHoveredArtwork !== hoveredArtwork) {
      this.enlargeArtwork(hoveredArtwork);
      this.currentlyHoveredArtwork = hoveredArtwork;
    }
  }

  handleClick(intersects, ui) {
    if (intersects.length > 0) {
      let idx = undefined;
      const clickedObject = intersects[0].object;
      if (clickedObject.name === 'left' || clickedObject.name === 'right') {
        const direction = clickedObject.name === 'left' ? -1 : 1;
        this.rotateGallery(clickedObject.userData, direction);
        ui.hideDescription();
        ui.hideDetailedDescription();
      } else {
        idx = clickedObject.userData;
        if (typeof idx === 'number' && idx >= 0 && idx < 6) {
          ui.showDescription(idx);
          ui.showDetailedDescription(idx);
        } else {
          ui.hideDescription();
          ui.hideDetailedDescription();
        }
      }
    } else {
      ui.hideDescription();
      ui.hideDetailedDescription();
    }
  }

  rotateGallery(index, direction) {
    const newRotationY = this.root.rotation.y + (direction * 2 * Math.PI) / this.count;

    const titleElement = document.getElementById('title');
    const artistElement = document.getElementById('artist');

    new TWEEN.Tween(this.root.rotation)
      .to({ y: newRotationY }, 1500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start()
      .onStart(() => {
        titleElement.style.opacity = 0;
        artistElement.style.opacity = 0;
      })
      .onComplete(() => {
        titleElement.innerText = titles[index];
        artistElement.innerText = artists[index];
        titleElement.style.opacity = 1;
        artistElement.style.opacity = 1;
      });
  }

  getRoot() {
    return this.root;
  }
} 