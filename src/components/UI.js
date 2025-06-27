import * as THREE from 'three';
import { descriptions, extendedDescriptions } from '../utils/constants.js';

export class UI {
  constructor() {
    this.createDescriptionOverlay();
    this.createDetailedDescriptionPanel();
    this.createResetButton();
    this.createTourButton();
    this.createCameraInfoPanel();
    this.createMusicPlayer();
  }

  createDescriptionOverlay() {
    let overlay = document.getElementById('art-description');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'art-description';
      overlay.style.position = 'fixed';
      overlay.style.bottom = '2em';
      overlay.style.left = '50%';
      overlay.style.transform = 'translateX(-50%)';
      overlay.style.background = 'rgba(30,30,30,0.95)';
      overlay.style.color = '#fff';
      overlay.style.padding = '1em 2em';
      overlay.style.borderRadius = '1em';
      overlay.style.fontFamily = 'Inter, sans-serif';
      overlay.style.fontSize = '1.2em';
      overlay.style.display = 'none';
      overlay.style.zIndex = 1000;
      document.body.appendChild(overlay);
    }
  }

  createDetailedDescriptionPanel() {
    let detailedPanel = document.getElementById('detailed-description');
    if (!detailedPanel) {
      detailedPanel = document.createElement('div');
      detailedPanel.id = 'detailed-description';
      detailedPanel.style.position = 'fixed';
      detailedPanel.style.top = '50%';
      detailedPanel.style.right = '2em';
      detailedPanel.style.transform = 'translateY(-50%)';
      detailedPanel.style.background = 'rgba(20,20,20,0.95)';
      detailedPanel.style.color = '#fff';
      detailedPanel.style.padding = '2em';
      detailedPanel.style.borderRadius = '1em';
      detailedPanel.style.fontFamily = 'Inter, sans-serif';
      detailedPanel.style.fontSize = '1em';
      detailedPanel.style.maxWidth = '400px';
      detailedPanel.style.maxHeight = '70vh';
      detailedPanel.style.overflowY = 'auto';
      detailedPanel.style.display = 'none';
      detailedPanel.style.zIndex = 1003;
      detailedPanel.style.border = '1px solid rgba(255,255,255,0.1)';
      detailedPanel.style.backdropFilter = 'blur(10px)';
      document.body.appendChild(detailedPanel);
    }
  }

  createResetButton() {
    let resetBtn = document.getElementById('reset-camera-btn');
    if (!resetBtn) {
      resetBtn = document.createElement('button');
      resetBtn.id = 'reset-camera-btn';
      resetBtn.innerText = 'Reset Camera';
      resetBtn.style.position = 'fixed';
      resetBtn.style.top = '1em';
      resetBtn.style.left = '1em';
      resetBtn.style.padding = '0.7em 1.2em';
      resetBtn.style.background = '#222';
      resetBtn.style.color = '#fff';
      resetBtn.style.border = 'none';
      resetBtn.style.borderRadius = '0.7em';
      resetBtn.style.fontFamily = 'Inter, sans-serif';
      resetBtn.style.fontSize = '1em';
      resetBtn.style.cursor = 'pointer';
      resetBtn.style.zIndex = 1002;
      document.body.appendChild(resetBtn);
    }
    return resetBtn;
  }

  createTourButton() {
    let tourBtn = document.getElementById('take-tour-btn');
    if (!tourBtn) {
      tourBtn = document.createElement('button');
      tourBtn.id = 'take-tour-btn';
      tourBtn.innerText = 'Take a Tour';
      tourBtn.style.position = 'fixed';
      tourBtn.style.top = '4em';
      tourBtn.style.left = '1em';
      tourBtn.style.padding = '0.7em 1.2em';
      tourBtn.style.background = '#222';
      tourBtn.style.color = '#fff';
      tourBtn.style.border = 'none';
      tourBtn.style.borderRadius = '0.7em';
      tourBtn.style.fontFamily = 'Inter, sans-serif';
      tourBtn.style.fontSize = '1em';
      tourBtn.style.cursor = 'pointer';
      tourBtn.style.zIndex = 1002;
      document.body.appendChild(tourBtn);
    }
    return tourBtn;
  }

  createCameraInfoPanel() {
    let infoPanel = document.getElementById('camera-info');
    if (!infoPanel) {
      infoPanel = document.createElement('div');
      infoPanel.id = 'camera-info';
      infoPanel.style.position = 'fixed';
      infoPanel.style.top = '1em';
      infoPanel.style.right = '1em';
      infoPanel.style.background = 'rgba(30,30,30,0.85)';
      infoPanel.style.color = '#fff';
      infoPanel.style.padding = '0.7em 1.2em';
      infoPanel.style.borderRadius = '0.7em';
      infoPanel.style.fontFamily = 'Inter, sans-serif';
      infoPanel.style.fontSize = '1em';
      infoPanel.style.zIndex = 1001;
      document.body.appendChild(infoPanel);
    }
    return infoPanel;
  }

  createMusicPlayer() {
    let music = document.getElementById('gallery-music');
    if (!music) {
      music = document.createElement('audio');
      music.id = 'gallery-music';
      music.src = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      music.loop = true;
      music.style.display = 'none';
      document.body.appendChild(music);
    }
    return music;
  }

  showDescription(index) {
    const overlay = document.getElementById('art-description');
    if (overlay && index >= 0 && index < descriptions.length) {
      overlay.innerText = descriptions[index];
      overlay.style.display = 'block';
    }
  }

  showDetailedDescription(index) {
    const detailedPanel = document.getElementById('detailed-description');
    if (detailedPanel && index >= 0 && index < extendedDescriptions.length) {
      detailedPanel.innerHTML = extendedDescriptions[index].replace(/\n/g, '<br>');
      detailedPanel.style.display = 'block';
    }
  }

  hideDescription() {
    const overlay = document.getElementById('art-description');
    if (overlay) {
      overlay.style.display = 'none';
    }
  }

  hideDetailedDescription() {
    const detailedPanel = document.getElementById('detailed-description');
    if (detailedPanel) {
      detailedPanel.style.display = 'none';
    }
  }

  updateCameraInfo(camera) {
    const infoPanel = document.getElementById('camera-info');
    if (infoPanel) {
      const pos = camera.position;
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      infoPanel.innerHTML = `
        <b>Camera Position:</b><br>
        x: ${pos.x.toFixed(2)}, y: ${pos.y.toFixed(2)}, z: ${pos.z.toFixed(2)}<br>
        <b>Direction:</b><br>
        x: ${dir.x.toFixed(2)}, y: ${dir.y.toFixed(2)}, z: ${dir.z.toFixed(2)}
      `;
    }
  }
} 