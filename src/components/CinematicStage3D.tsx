import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface CinematicStage3DProps {
  scrollProgress: number;
  viewportProgress: number;
  mousePos: { x: number; y: number };
}

export const CinematicStage3D: React.FC<CinematicStage3DProps> = ({
  viewportProgress,
  mousePos,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Video element refs for photoreal multi-scene scroll flight
  const video1Ref = useRef<HTMLVideoElement | null>(null); // London Eye nocturnal flight
  const video2Ref = useRef<HTMLVideoElement | null>(null); // London Street with red buses & nightlife
  const video3Ref = useRef<HTMLVideoElement | null>(null); // London nocturnal skyline push-in

  const [videosReady, setVideosReady] = useState(false);
  const vHRef = useRef(viewportProgress);
  const mouseRef = useRef(mousePos);

  // Track smoothed scrubber targets for jitter-free scrubbing
  const scrubberState = useRef({
    v1: { cur: 0, target: 0 },
    v2: { cur: 0, target: 0 },
    v3: { cur: 0, target: 0 },
  });

  useEffect(() => {
    vHRef.current = viewportProgress;
  }, [viewportProgress]);

  useEffect(() => {
    mouseRef.current = mousePos;
  }, [mousePos]);

  // Initialize and prime video elements for frame-accurate seeking
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    const v3 = video3Ref.current;

    const videos = [v1, v2, v3].filter(Boolean) as HTMLVideoElement[];

    let loadedCount = 0;
    const handleLoaded = () => {
      loadedCount++;
      if (loadedCount >= 1) {
        setVideosReady(true);
      }
    };

    videos.forEach((v) => {
      v.muted = true;
      v.playsInline = true;
      v.preload = 'auto';
      if (v.readyState >= 2) {
        handleLoaded();
      } else {
        v.addEventListener('loadeddata', handleLoaded, { once: true });
      }
    });

    // Touch/pointer primer for mobile decoders
    const primeVideos = () => {
      videos.forEach((v) => {
        try {
          const p = v.play();
          if (p && p.then) {
            p.then(() => v.pause()).catch(() => {});
          }
        } catch (_) {}
      });
    };
    window.addEventListener('pointerdown', primeVideos, { once: true });

    return () => {
      window.removeEventListener('pointerdown', primeVideos);
    };
  }, []);

  // Frame-accurate Video Scrubbing Loop (Auteur Scroll-Flight Engine)
  useEffect(() => {
    let animId: number;

    const scrubLoop = () => {
      animId = requestAnimationFrame(scrubLoop);
      const vH = vHRef.current;

      // Calculate target progress per scene
      // Scene 01: Aperture Hero (vH 0.0 to 1.5)
      scrubberState.current.v1.target = Math.min(Math.max(vH / 1.5, 0), 1);

      // Scene 02: Systems Boulevard Walkthrough (vH 1.0 to 3.2)
      scrubberState.current.v2.target = Math.min(Math.max((vH - 1.0) / 2.2, 0), 1);

      // Scene 03 - 05: Trajectory, Capabilities & Direct Comm (vH 3.0 to 5.5)
      scrubberState.current.v3.target = Math.min(Math.max((vH - 3.0) / 2.5, 0), 1);

      // Scrub Video 1 (London Eye Night)
      const v1 = video1Ref.current;
      if (v1 && v1.duration && !v1.seeking) {
        const s = scrubberState.current.v1;
        s.cur += (s.target - s.cur) * 0.16;
        const targetTime = s.cur * (v1.duration - 0.05);
        if (Math.abs(v1.currentTime - targetTime) > 0.01) {
          try {
            v1.currentTime = targetTime;
          } catch (_) {}
        }
      }

      // Scrub Video 2 (London Street & Traffic)
      const v2 = video2Ref.current;
      if (v2 && v2.duration && !v2.seeking && vH >= 0.8 && vH <= 3.6) {
        const s = scrubberState.current.v2;
        s.cur += (s.target - s.cur) * 0.16;
        const targetTime = s.cur * (v2.duration - 0.05);
        if (Math.abs(v2.currentTime - targetTime) > 0.01) {
          try {
            v2.currentTime = targetTime;
          } catch (_) {}
        }
      }

      // Scrub Video 3 (Nocturnal City Skyline)
      const v3 = video3Ref.current;
      if (v3 && v3.duration && !v3.seeking && vH >= 2.8) {
        const s = scrubberState.current.v3;
        s.cur += (s.target - s.cur) * 0.16;
        const targetTime = s.cur * (v3.duration - 0.05);
        if (Math.abs(v3.currentTime - targetTime) > 0.01) {
          try {
            v3.currentTime = targetTime;
          } catch (_) {}
        }
      }
    };

    animId = requestAnimationFrame(scrubLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Three.js High-Tech Holographic Telemetry Overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true, // Transparent canvas overlaid on top of photoreal video
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Floating Holographic Dust & Light Particles
    const dustCount = 280;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 35;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.18,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // Glowing Global Trajectory Arc (London to Hyderabad - Chapter 03)
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-8, -4, 0),
      new THREE.Vector3(0, 5, 2),
      new THREE.Vector3(8, -2, -2)
    );
    const curvePoints = curve.getPoints(60);
    const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const curveMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.8,
      linewidth: 2,
    });
    const trajectoryLine = new THREE.Line(curveGeo, curveMat);
    scene.add(trajectoryLine);

    // Dynamic Telemetry Grid Ring (Radar Scanner)
    const ringGeo = new THREE.RingGeometry(4.0, 4.05, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const telemetryRing = new THREE.Mesh(ringGeo, ringMat);
    telemetryRing.position.set(6, 2, -5);
    scene.add(telemetryRing);

    let lastTime = performance.now();

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);
      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      const vH = vHRef.current;
      const m = mouseRef.current;

      // Mouse Parallax perspective tilt
      camera.position.x += (m.x * 1.5 - camera.position.x) * 0.06;
      camera.position.y += (m.y * 1.0 - camera.position.y) * 0.06;
      camera.lookAt(0, 0, 0);

      // Rotate Telemetry Ring
      telemetryRing.rotation.z += 0.005;

      // Drift floating particles
      const pos = dustGeo.attributes.position;
      for (let i = 0; i < dustCount; i++) {
        let py = pos.getY(i) - delta * 0.4;
        if (py < -12) py = 12;
        pos.setY(i, py);
      }
      pos.needsUpdate = true;

      // Trajectory line opacity reacts to Chapter 03
      if (vH >= 3.0 && vH < 4.2) {
        trajectoryLine.visible = true;
        curveMat.opacity = 0.5 + Math.sin(time * 0.004) * 0.4;
      } else {
        trajectoryLine.visible = false;
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Compute opacities & camera dolly transforms for each scene
  const vH = viewportProgress;

  // Scene 1: London Eye (0.0 to 1.5 vH)
  const v1Opacity = vH < 1.0 ? 1 : Math.max(0, 1 - (vH - 1.0) / 0.5);

  // Scene 2: London Street with red buses (1.0 to 3.2 vH)
  const v2Opacity =
    vH < 1.0
      ? 0
      : vH < 1.5
      ? (vH - 1.0) / 0.5
      : vH < 2.8
      ? 1
      : Math.max(0, 1 - (vH - 2.8) / 0.5);

  // Scene 3: Nocturnal Skyline (3.0 to 6.0 vH)
  const v3Opacity = vH < 2.8 ? 0 : Math.min(1, (vH - 2.8) / 0.5);

  // Scroll camera dolly push-in (subtle zoom as user traverses down the timeline)
  const dollyScale = 1.0 + (viewportProgress % 2.0) * 0.08;
  const parallaxTransform = `translate3d(${mousePos.x * 12}px, ${-mousePos.y * 8}px, 0) scale(${dollyScale})`;

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#04060c] transition-opacity duration-1000 ${
        videosReady ? 'opacity-100' : 'opacity-80'
      }`}
    >
      {/* 1. PHOTOREAL SCENE 01: LONDON EYE & THAMES NOCTURNAL CRUISE */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{ opacity: v1Opacity, willChange: 'opacity, transform' }}
      >
        <video
          ref={video1Ref}
          src="/assets/videos/london-eye-night.mp4"
          className="w-full h-full object-cover"
          style={{ transform: parallaxTransform, transformOrigin: 'center center' }}
          muted
          playsInline
        />
      </div>

      {/* 2. PHOTOREAL SCENE 02: LONDON EMBANKMENT & STREET ARCHITECTURE */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{ opacity: v2Opacity, willChange: 'opacity, transform' }}
      >
        <video
          ref={video2Ref}
          src="/assets/videos/london-street-night.mp4"
          className="w-full h-full object-cover"
          style={{ transform: parallaxTransform, transformOrigin: 'center center' }}
          muted
          playsInline
        />
      </div>

      {/* 3. PHOTOREAL SCENE 03 - 05: NOCTURNAL CITY SKYLINE */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{ opacity: v3Opacity, willChange: 'opacity, transform' }}
      >
        <video
          ref={video3Ref}
          src="/assets/videos/london-skyline-night.mp4"
          className="w-full h-full object-cover"
          style={{ transform: parallaxTransform, transformOrigin: 'center center' }}
          muted
          playsInline
        />
      </div>

      {/* 4. CINEMATIC COLOR GRADING & DARK LUXURY VIGNETTE OVERLAY */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/75 pointer-events-none"
        style={{ mixBlendMode: 'multiply' }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60 pointer-events-none"
      />

      {/* 5. TRANSPARENT HOLOGRAPHIC THREE.JS WEBGL OVERLAY */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* 6. TELEMETRY WATERMARK */}
      <div className="absolute top-16 right-6 font-mono text-[9px] text-neutral-500 tracking-widest uppercase pointer-events-none hidden sm:block">
        LON 51.5074° N, 0.1278° W // 4K HIGH FIDELITY
      </div>
    </div>
  );
};