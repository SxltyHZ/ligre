import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Fondo negro

// Cámara
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Render
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 5, 3);
scene.add(directionalLight);

// Esfera (planeta)
const geometry = new THREE.SphereGeometry(1.5, 32, 32); // radio, segmentos
const material = new THREE.MeshStandardMaterial({ color: 0x0044ff });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Animación
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();

// Responsividad
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
