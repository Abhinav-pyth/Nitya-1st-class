import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function InteractiveMascot() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    mascot: THREE.Group;
    stars: THREE.Points;
    mouse: { x: number; y: number };
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff6b9d, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x4ecdc4, 1, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create mascot (cute star character)
    const mascot = new THREE.Group();

    // Star body
    const starShape = new THREE.Shape();
    const outerRadius = 1;
    const innerRadius = 0.5;
    const points = 5;

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) {
        starShape.moveTo(x, y);
      } else {
        starShape.lineTo(x, y);
      }
    }
    starShape.closePath();

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1,
    };

    const starGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
    const starMaterial = new THREE.MeshPhongMaterial({
      color: 0xffd93d,
      shininess: 100,
      specular: 0xffffff,
    });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.z = -0.15;
    mascot.add(star);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.12, 32, 32);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.25, 0.15, 0.2);
    mascot.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.25, 0.15, 0.2);
    mascot.add(rightEye);

    // Eye shine
    const shineGeometry = new THREE.SphereGeometry(0.04, 16, 16);
    const shineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    const leftShine = new THREE.Mesh(shineGeometry, shineMaterial);
    leftShine.position.set(-0.22, 0.18, 0.3);
    mascot.add(leftShine);

    const rightShine = new THREE.Mesh(shineGeometry, shineMaterial);
    rightShine.position.set(0.28, 0.18, 0.3);
    mascot.add(rightShine);

    // Smile
    const smileShape = new THREE.Shape();
    smileShape.absarc(0, 0, 0.2, 0, Math.PI, false);
    const smileGeometry = new THREE.ShapeGeometry(smileShape);
    const smileMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x000000, 
      side: THREE.DoubleSide 
    });
    const smile = new THREE.Mesh(smileGeometry, smileMaterial);
    smile.position.set(0, -0.15, 0.2);
    smile.rotation.z = Math.PI;
    mascot.add(smile);

    // Cheeks (blush)
    const cheekGeometry = new THREE.CircleGeometry(0.08, 32);
    const cheekMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xff9999, 
      transparent: true, 
      opacity: 0.6 
    });
    
    const leftCheek = new THREE.Mesh(cheekGeometry, cheekMaterial);
    leftCheek.position.set(-0.35, -0.05, 0.2);
    mascot.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeometry, cheekMaterial);
    rightCheek.position.set(0.35, -0.05, 0.2);
    mascot.add(rightCheek);

    scene.add(mascot);

    // Floating particles (stars)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 50;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffd93d,
      transparent: true,
      opacity: 0.8,
    });

    const stars = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(stars);

    // Mouse interaction
    const mouse = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleClick = () => {
      // Bounce animation on click
      const scale = mascot.scale;
      const originalScale = { x: scale.x, y: scale.y, z: scale.z };
      
      // Quick scale up then back
      mascot.scale.set(1.3, 1.3, 1.3);
      setTimeout(() => {
        mascot.scale.set(originalScale.x, originalScale.y, originalScale.z);
      }, 200);
    };

    mount.addEventListener('mousemove', handleMouseMove);
    mount.addEventListener('click', handleClick);

    // Store references
    sceneRef.current = { scene, camera, renderer, mascot, stars, mouse };

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Rotate mascot gently
      mascot.rotation.y = Math.sin(time) * 0.3;
      mascot.rotation.x = Math.cos(time * 0.5) * 0.2;

      // Follow mouse slightly
      mascot.position.x += (mouse.x * 0.5 - mascot.position.x) * 0.05;
      mascot.position.y += (mouse.y * 0.5 - mascot.position.y) * 0.05;

      // Float up and down
      mascot.position.y += Math.sin(time * 2) * 0.002;

      // Rotate stars
      stars.rotation.y += 0.001;
      stars.rotation.x += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeEventListener('mousemove', handleMouseMove);
      mount.removeEventListener('click', handleClick);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-64 md:h-80 cursor-pointer relative"
      style={{ touchAction: 'none' }}
    />
  );
}
