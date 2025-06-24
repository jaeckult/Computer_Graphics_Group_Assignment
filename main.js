import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import * as TWEEN from 'tween';

const images = [
  'AIDA_MULUNEH_I-IN-THE-OTHER_2017.jpg',
  'AIDA_MULUNEH_BOTH-SIDES_2017.jpg',
  'THE-DEW-AT-DAWN_19_AIDA_MULUNEH_FN_60X80-scaled.jpg',
  'AIDA-MULUNEH_The-barriers-within_2021-scaled.jpg',
  'AIDA_MULUNEH_EVERYBODY-KNOWS-ABOUT-MISSISSIPPI_2017.jpg',
  'This-is-Where-I-am-Cover.jpg'
];

const titles = [
  'I IN THE OTHER',
  'BOTH SIDES',
  'THE DEW AT DAWN',
  'The-barriers',
  'EVERYBODY KNOWS ABOUT MISSISSIPPI',
  'This is Where I am Cover'
];

const artists = [
  'Aida Muluneh',
  'Aida Muluneh',
  'Aida Muluneh',
  'Aida Muluneh',
  'Aida Muluneh',
  'Aida Muluneh',
];

const textureLoader = new THREE.TextureLoader();
const leftArrowImage = textureLoader.load(left.png);
const rightArrowImage = textureLoader.load(right.png);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 2;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);


const root = new THREE.Object3D();
scene.add(root);

const count = 6;
for (let i = 0; i < count; i++) {
  const image = textureLoader.load(images[i]);

  const baseNode = new THREE.Object3D();
  baseNode.rotation.y = 2 * Math.PI * (i / count);

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

  root.add(baseNode);
}
