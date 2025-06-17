// Importar desde CDN (Three.js + loaders + controles)
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js';

// Crear escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Fondo negro

// Cámara
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.5, 5);

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Controles (OrbitControls)
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0); // Punto de interés (opcional)
controls.enableDamping = true; // Suavidad al rotar

// Iluminación
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 5, 3);
scene.add(directionalLight);

// Cargar modelo GLB
const loader = new GLTFLoader();
loader.load(
  './models/planet.glb', // Asegúrate que esta ruta sea correcta
  (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1); // Ajusta escala si es necesario
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error('Error al cargar el modelo:', error);
  }
);

// Responsividad
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})


