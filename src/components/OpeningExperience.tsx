import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../lib/config';

interface OpeningExperienceProps {
  onEnter: () => void;
  isOpen: boolean;
}

export const OpeningExperience: React.FC<OpeningExperienceProps> = ({ onEnter, isOpen }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [webGLFailed, setWebGLFailed] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isOpen || reducedMotion || !mountRef.current) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let animationFrameId: number;
    let clothMesh: THREE.Mesh;
    let particlesMesh: THREE.Points;
    let clock = new THREE.Clock();

    try {
      const container = mountRef.current;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      // 1. Scene & Camera
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x140a0d, 0.05);

      camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
      camera.position.set(0, 0, 7.5);

      // 2. Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      // 3. Dynamic Silk Drape Cloth Simulation
      const clothSegmentsX = 48;
      const clothSegmentsY = 36;
      const clothGeometry = new THREE.PlaneGeometry(12, 9, clothSegmentsX, clothSegmentsY);
      const posAttribute = clothGeometry.attributes.position;
      const originalPositions = new Float32Array(posAttribute.array);

      const clothMaterial = new THREE.MeshStandardMaterial({
        color: 0x3d0b13, // Deep Royal Burgundy
        roughness: 0.35,
        metalness: 0.45,
        side: THREE.DoubleSide,
      });

      clothMesh = new THREE.Mesh(clothGeometry, clothMaterial);
      clothMesh.rotation.x = -0.15;
      clothMesh.rotation.y = 0.2;
      clothMesh.position.set(0, 0, -0.5);
      scene.add(clothMesh);

      // 4. Golden Particles Atmosphere
      const particleCount = 220;
      const particleGeo = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 14;
        particlePositions[i + 1] = (Math.random() - 0.5) * 10;
        particlePositions[i + 2] = (Math.random() - 0.5) * 8;
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

      // Golden particle canvas texture
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 240, 200, 1)');
        gradient.addColorStop(0.3, 'rgba(212, 175, 55, 0.8)');
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      const particleTexture = new THREE.CanvasTexture(canvas);

      const particleMat = new THREE.PointsMaterial({
        size: 0.16,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      particlesMesh = new THREE.Points(particleGeo, particleMat);
      scene.add(particlesMesh);

      // 5. Lighting: Atmospheric gold and champagne lighting
      const ambientLight = new THREE.AmbientLight(0xffecd2, 0.6);
      scene.add(ambientLight);

      const goldLight = new THREE.DirectionalLight(0xd4af37, 2.2);
      goldLight.position.set(5, 4, 6);
      scene.add(goldLight);

      const roseLight = new THREE.PointLight(0xe8b4b8, 2.5, 12);
      roseLight.position.set(-4, -2, 4);
      scene.add(roseLight);

      // Mouse parallax
      let mouseX = 0;
      let mouseY = 0;
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', handleMouseMove);

      // Resize
      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      // 6. Animation loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Wave deformation for silk cloth
        const pos = clothGeometry.attributes.position;
        const arr = pos.array as Float32Array;
        for (let i = 0; i < pos.count; i++) {
          const u = originalPositions[i * 3];
          const v = originalPositions[i * 3 + 1];
          // Fluid silk wave formula
          const wave =
            Math.sin(u * 0.7 + elapsed * 1.6) * 0.45 +
            Math.cos(v * 0.8 + elapsed * 1.3) * 0.35 +
            Math.sin((u + v) * 0.4 + elapsed * 0.9) * 0.25;
          arr[i * 3 + 2] = originalPositions[i * 3 + 2] + wave;
        }
        pos.needsUpdate = true;
        clothGeometry.computeVertexNormals();

        // Parallax & slow rotation
        clothMesh.rotation.y = 0.18 + mouseX * 0.08;
        clothMesh.rotation.x = -0.12 - mouseY * 0.06;

        // Particle gentle drifting
        particlesMesh.rotation.y = elapsed * 0.04;
        particlesMesh.rotation.x = elapsed * 0.02;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (renderer) renderer.dispose();
        if (clothGeometry) clothGeometry.dispose();
        if (clothMaterial) clothMaterial.dispose();
        if (particleGeo) particleGeo.dispose();
        if (particleMat) particleMat.dispose();
      };
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to CSS luxury mode:', err);
      setTimeout(() => setWebGLFailed(true), 0);
    }
  }, [isOpen, reducedMotion]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="ennaval-opening-portal"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#140A0D] overflow-hidden text-[#FAF8F5]"
      >
        {/* 3D Three.js Canvas Container */}
        {(!reducedMotion && !webGLFailed) && (
          <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-85" />
        )}

        {/* Fallback Ambient Layer if 3D is disabled or fails */}
        {(reducedMotion || webGLFailed) && (
          <div className="absolute inset-0 bg-radial from-[#3A0810]/60 via-[#1C090F]/90 to-[#0F0407] pointer-events-none" />
        )}

        {/* Subtle Vignette & Light Reflections */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#140A0D]/40 to-[#140A0D]/95 pointer-events-none" />

        {/* Cinematic Content Reveal */}
        <div className="relative z-10 max-w-3xl px-6 text-center flex flex-col items-center">
          {/* Subtle Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/35 bg-[#1A0B10]/70 backdrop-blur-md text-[#E8B4B8] text-xs font-medium tracking-[0.22em] uppercase mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Curated by {BRAND_CONFIG.owners.names}</span>
          </motion.div>

          {/* Majestic Brand Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-3"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-editorial tracking-[0.08em] gold-text-gradient font-light drop-shadow-2xl">
              ENNAVAL
            </h1>
            <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
          </motion.div>

          {/* Subtitle / Haute Couture Definition */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-stone-300 text-sm sm:text-base md:text-lg max-w-xl font-light tracking-wide leading-relaxed mb-8"
          >
            An intimate luxury sanctuary of handcrafted handloom sarees, regal ethnic silhouettes, contemporary western fashion, and refined cosmetics.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={onEnter}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] via-[#DFBF77] to-[#AA822A] text-[#1A090D] font-medium tracking-widest text-xs uppercase rounded-sm shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02]"
            >
              <span>Enter Boutique</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onEnter}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 text-xs uppercase tracking-widest text-stone-400 hover:text-[#FAF8F5] transition-colors border border-white/10 hover:border-white/25 rounded-sm"
            >
              Skip Experience
            </button>
          </motion.div>

          {/* Online boutique authenticity notice */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-[11px] tracking-widest uppercase text-stone-400/80 mt-10"
          >
            Online-Only Luxury Boutique • Worldwide Insured Delivery
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
