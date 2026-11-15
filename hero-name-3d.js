/* hero-name-3d.js — cinematic 3D name animation (Three.js, Cinzel Black embedded)
   Needs an importmap for "three" and "three/addons/" (see index snippet). */
import * as THREE from 'three';
import { TTFLoader } from 'three/addons/loaders/TTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const NAME = 'SAI KRISHNA';

let host = document.getElementById('hero-name-3d');

function boot() {
  host = document.getElementById('hero-name-3d');
  if (host && !host.dataset.initialized) {
    host.dataset.initialized = 'true';
    init().catch(e => { console.warn('3D name failed, using text fallback', e); host.classList.add('fallback'); });
    return true;
  }
  return !!host;
}

if (!boot()) {
  const obs = new MutationObserver(() => {
    if (boot()) obs.disconnect();
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });
}

async function init() {
  /* ---------- renderer / scene ---------- */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);
  renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 200);

  /* ---------- font: inscribed Roman capitals (Cinzel Black) ---------- */
  let buf;
  try {
    const res = await fetch('./fonts/cinzel-black.ttf');
    if (!res.ok) throw new Error('Local font fetch failed');
    buf = await res.arrayBuffer();
  } catch {
    const res = await fetch('./fonts/anton.ttf');
    if (!res.ok) throw new Error('No display font available');
    buf = await res.arrayBuffer();
  }
  const font = new FontLoader().parse(new TTFLoader().parse(buf));
  const SIZE = 1, TRACK = 0.12;
  const scaleF = SIZE / font.data.resolution;
  const adv = ch => (font.data.glyphs[ch] || font.data.glyphs['?']).ha * scaleF;

  /* ---------- material: weathered bone-stone, dust, scratches, film burn ---------- */
  function surfaceCanvas(size, base) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const x = c.getContext('2d', { willReadFrequently: true });
    x.fillStyle = base;
    x.fillRect(0, 0, size, size);

    // uneven mineral mottling
    for (let i = 0; i < 240; i++) {
      const cx2 = Math.random() * size, cy2 = Math.random() * size;
      const r = Math.random() * size * 0.16 + 6;
      const g = x.createRadialGradient(cx2, cy2, 0, cx2, cy2, r);
      const dark = Math.random() < 0.62;
      g.addColorStop(0, dark
        ? `rgba(48,40,32,${(Math.random() * 0.10).toFixed(3)})`
        : `rgba(255,247,231,${(Math.random() * 0.10).toFixed(3)})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      x.fillStyle = g;
      x.beginPath(); x.arc(cx2, cy2, r, 0, Math.PI * 2); x.fill();
    }

    // hairline scratches, dust drags and a few vertical streaks
    for (let i = 0; i < 80; i++) {
      const sx = Math.random() * size, sy = Math.random() * size;
      const len = Math.random() * size * 0.45 + 18;
      const ang = Math.random() < 0.16 ? Math.PI / 2 : (Math.random() - 0.5) * 0.3;
      const light = Math.random() < 0.45;
      x.strokeStyle = light
        ? `rgba(246,238,220,${(Math.random() * 0.18 + 0.03).toFixed(3)})`
        : `rgba(26,21,17,${(Math.random() * 0.2 + 0.03).toFixed(3)})`;
      x.lineWidth = Math.random() * 1.3 + 0.3;
      x.beginPath();
      x.moveTo(sx, sy);
      x.lineTo(sx + Math.cos(ang) * len, sy + Math.sin(ang) * len);
      x.stroke();
    }

    // film grain
    const img = x.getImageData(0, 0, size, size), d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.random() - 0.5) * 30;
      d[i] = Math.max(0, Math.min(255, d[i] + n));
      d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n));
      d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n));
    }
    x.putImageData(img, 0, 0);
    return c;
  }

  function reliefCanvas(size) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const x = c.getContext('2d', { willReadFrequently: true });
    x.fillStyle = '#d2d2d2';
    x.fillRect(0, 0, size, size);
    const img = x.getImageData(0, 0, size, size), d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.random() - 0.5) * 90;
      d[i] = d[i + 1] = d[i + 2] = Math.max(30, Math.min(255, 210 + n));
    }
    x.putImageData(img, 0, 0);
    // pitting
    for (let i = 0; i < 140; i++) {
      const px = Math.random() * size, py = Math.random() * size;
      const r = Math.random() * 3 + 0.6;
      x.fillStyle = `rgba(60,60,60,${(Math.random() * 0.5 + 0.2).toFixed(2)})`;
      x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill();
    }
    return c;
  }

  const grimeTex = new THREE.CanvasTexture(surfaceCanvas(1024, '#d3cfc6'));
  grimeTex.colorSpace = THREE.SRGBColorSpace;
  grimeTex.wrapS = grimeTex.wrapT = THREE.RepeatWrapping;
  grimeTex.repeat.set(1.15, 1.15);
  grimeTex.anisotropy = 4;

  const reliefTex = new THREE.CanvasTexture(reliefCanvas(512));
  reliefTex.wrapS = reliefTex.wrapT = THREE.RepeatWrapping;
  reliefTex.repeat.set(2.2, 2.2);

  const mat = new THREE.MeshStandardMaterial({
    color: 0xfbf7ef,
    map: grimeTex,
    bumpMap: reliefTex,
    bumpScale: 0.038,
    roughnessMap: reliefTex,
    roughness: 0.92,
    metalness: 0.02,
  });
  const sideMat = new THREE.MeshStandardMaterial({
    color: 0x1c1512,
    roughness: 0.97,
    metalness: 0.02,
  });

  /* ---------- lights: warm key, cold fill, hard red rim from behind ---------- */
  scene.add(new THREE.AmbientLight(0x2a2622, 1.05));
  const key = new THREE.DirectionalLight(0xfff8ec, 3.9); key.position.set(-6, 8, 7); scene.add(key);
  const fill = new THREE.DirectionalLight(0x4f6a89, 0.6); fill.position.set(8, -3, 5); scene.add(fill);
  const graze = new THREE.DirectionalLight(0xffe6c6, 1.5); graze.position.set(-1.5, 9, 1.2); scene.add(graze);
  const kick = new THREE.DirectionalLight(0xff3a1c, 0.9); kick.position.set(4, -5, 3); scene.add(kick);
  const rimL = new THREE.PointLight(0xff2412, 95, 0, 2); scene.add(rimL);
  const rimR = new THREE.PointLight(0xff3018, 95, 0, 2); scene.add(rimR);
  const under = new THREE.PointLight(0xff1808, 26, 0, 2); scene.add(under);
  const sweep = new THREE.PointLight(0xffe9d2, 0, 0, 2); scene.add(sweep);

  /* ---------- build letters ---------- */
  const group = new THREE.Group(); scene.add(group);
  const letters = [];
  let layout = null;

  function build(lines) {
    letters.forEach(l => { group.remove(l.mesh); l.mesh.geometry.dispose(); });
    letters.length = 0;
    const lineW = lines.map(t => [...t].reduce((w, c, i) => w + adv(c) + (i < t.length - 1 ? TRACK : 0), 0));
    const W = Math.max(...lineW), lineH = 1.35;
    let idx = 0;
    lines.forEach((t, li) => {
      let x = -lineW[li] / 2;
      const y = (lines.length - 1) * lineH / 2 - li * lineH;
      for (const c of t) {
        const a = adv(c);
        if (c !== ' ') {
          const g = new TextGeometry(c, { font, size: SIZE, depth: 0.32, height: 0.32, curveSegments: 14,
            bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.016, bevelSegments: 2 });
          g.computeBoundingBox();
          const bb = g.boundingBox;
          const cx = (bb.min.x + bb.max.x) / 2, cy = (bb.min.y + bb.max.y) / 2;
          g.translate(-cx, -cy, -0.19);
          const mesh = new THREE.Mesh(g, [mat, sideMat]);
          const homeX = x + cx * 1 , homeY = y + cy;
          mesh.position.set(homeX, homeY, 0);
          group.add(mesh);
          letters.push({ mesh, homeX, homeY, i: idx++ });
        }
        x += a + TRACK;
      }
    });
    layout = { W, H: lines.length * lineH };
  }

  /* ---------- sizing ---------- */
  let dist = 10, stacked = null;
  function resize() {
    const w = host.clientWidth || 1, h = host.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    const wantStack = w / h < 1.05;
    if (wantStack !== stacked) { stacked = wantStack; build(wantStack ? ['SAI', 'KRISHNA'] : [NAME]); resetAnim(); }
    const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const dW = layout.W / (0.82 * 2 * t * camera.aspect);
    const dH = layout.H / (0.8 * 2 * t);
    dist = Math.max(dW, dH);
    rimL.position.set(-layout.W / 2, 0.6, -2.2); rimR.position.set(layout.W / 2, 0.6, -2.2);
    under.position.set(0, -layout.H / 2 - 1.2, 3);
  }

  /* ---------- embers ---------- */
  const EN = 140, ep = new Float32Array(EN * 3), ev = new Float32Array(EN);
  for (let i = 0; i < EN; i++) { ep[i*3] = (Math.random()-.5)*16; ep[i*3+1] = (Math.random()-.5)*6; ep[i*3+2] = (Math.random()-.5)*5; ev[i] = .08 + Math.random()*.25; }
  const eg = new THREE.BufferGeometry(); eg.setAttribute('position', new THREE.BufferAttribute(ep, 3));
  const ec = document.createElement('canvas'); ec.width = ec.height = 32;
  const cx = ec.getContext('2d'), gr = cx.createRadialGradient(16,16,0,16,16,16);
  gr.addColorStop(0,'rgba(255,170,120,1)'); gr.addColorStop(.4,'rgba(255,60,30,.6)'); gr.addColorStop(1,'rgba(255,0,0,0)');
  cx.fillStyle = gr; cx.fillRect(0,0,32,32);
  const embers = new THREE.Points(eg, new THREE.PointsMaterial({ map: new THREE.CanvasTexture(ec), size: .09, transparent: true,
    opacity: .0, depthWrite: false, blending: THREE.AdditiveBlending }));
  scene.add(embers);

  /* ---------- animation state ---------- */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const G = 34, REST = 0.30;
  let t0 = 0, landed = 0, shake = 0, flash = 0, settledAt = null;
  const mouse = { x: 0, y: 0 }, mouseS = { x: 0, y: 0 };
  addEventListener('pointermove', e => { mouse.x = e.clientX / innerWidth * 2 - 1; mouse.y = e.clientY / innerHeight * 2 - 1; });

  function resetAnim() {
    t0 = performance.now() / 1000; landed = 0; settledAt = null;
    const topY = dist * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) + 3;
    letters.forEach(l => {
      l.delay = 0.45 + l.i * 0.13;
      l.y = l.homeY + topY + Math.random() * 3; l.vy = 0; l.state = reduce ? 'done' : 'wait';
      l.rx = (Math.random() < .5 ? -1 : 1) * (1.2 + Math.random() * 1.6); l.rz = (Math.random() - .5) * 1.4;
      l.vrx = 0; l.vrz = 0; l.bounces = 0;
      if (reduce) { l.y = l.homeY; l.rx = l.rz = 0; }
      l.mesh.visible = reduce;
    });
  }
  window.replayHeroName = resetAnim;

  resize(); resetAnim();
  new ResizeObserver(resize).observe(host);

  /* ---------- loop ---------- */
  let running = true, last = performance.now() / 1000;
  new IntersectionObserver(([e]) => { running = e.isIntersecting; last = performance.now() / 1000; }).observe(host);
  const ease = x => 1 - Math.pow(1 - x, 3);

  function frame() {
    requestAnimationFrame(frame);
    if (!running) return;
    const now = performance.now() / 1000, dt = Math.min(now - last, 1 / 30); last = now;
    const t = now - t0;

    let allDone = true;
    for (const l of letters) {
      if (l.state === 'wait') { allDone = false; if (t >= l.delay) { l.state = 'fall'; l.mesh.visible = true; } else continue; }
      if (l.state === 'fall') {
        allDone = false;
        l.vy -= G * dt; l.y += l.vy * dt;
        if (l.y <= l.homeY) {
          l.y = l.homeY;
          const impact = -l.vy;
          if (l.bounces === 0) { shake = Math.min(1, impact / 22); flash = 1; sweep.position.set(l.homeX, l.homeY + 0.3, 2.2); }
          l.vy = impact * REST; l.bounces++;
          if (impact < 3.5) { l.vy = 0; l.state = 'settle'; }
        }
        // tumble while falling, spring to flat after first impact
        const k = l.bounces ? 38 : 0, d = l.bounces ? 7 : 0;
        l.vrx += (-k * l.rx - d * l.vrx) * dt; l.rx += (l.bounces ? l.vrx : -0.0) * dt;
        l.vrz += (-k * l.rz - d * l.vrz) * dt; l.rz += (l.bounces ? l.vrz : 0) * dt;
        if (!l.bounces) { l.rx += Math.sign(l.rx) * 0.6 * dt; l.rz += l.rz * 0.2 * dt; }
      } else if (l.state === 'settle') {
        l.rx += (-l.rx) * Math.min(1, dt * 9); l.rz += (-l.rz) * Math.min(1, dt * 9);
        if (Math.abs(l.rx) < 0.002 && Math.abs(l.rz) < 0.002) { l.rx = l.rz = 0; l.state = 'done'; }
        allDone = false;
      }
      l.mesh.position.set(l.homeX, l.y, 0);
      l.mesh.rotation.set(l.rx, 0, l.rz);
    }
    if (allDone && settledAt === null) settledAt = t;
    const idle = settledAt === null ? 0 : Math.min(1, (t - settledAt) / 1.5);

    // idle float
    if (idle > 0) for (const l of letters) {
      l.mesh.position.y = l.homeY + Math.sin(now * 0.9 + l.i * 0.55) * 0.035 * idle;
      l.mesh.rotation.y = Math.sin(now * 0.5 + l.i * 0.4) * 0.05 * idle;
    }

    // camera: slow cinematic push-in + parallax + impact shake
    const push = ease(Math.min(1, t / 6.5));
    const d = dist * (1.28 - 0.28 * push) - Math.min(0.25, (t - 6.5) * 0.004 > 0 ? (t - 6.5) * 0.004 : 0);
    mouseS.x += (mouse.x - mouseS.x) * 0.05; mouseS.y += (mouse.y - mouseS.y) * 0.05;
    shake *= Math.pow(0.001, dt);
    camera.position.set(mouseS.x * 0.9 + (Math.random() - .5) * shake * 0.12,
                        -mouseS.y * 0.45 + 0.25 * (1 - push) + (Math.random() - .5) * shake * 0.12, d);
    camera.lookAt(0, 0, 0);
    group.rotation.y = mouseS.x * 0.10; group.rotation.x = mouseS.y * 0.05;

    // light sweep: after settle, a hot white light slides across every few seconds
    flash *= Math.pow(0.0005, dt);
    let sI = flash * 22;
    if (settledAt !== null) {
      const c = ((t - settledAt) % 7.5) / 2.6;               // 0..1 during sweep, >1 rests
      if (c < 1) { sweep.position.set(THREE.MathUtils.lerp(-layout.W * .6, layout.W * .6, c), 0.4, 2.4); sI = Math.sin(c * Math.PI) * 24; }
    }
    sweep.intensity = sI;
    rimL.intensity = 80 + Math.sin(now * 1.3) * 14; rimR.intensity = 80 + Math.cos(now * 1.1) * 14;

    // embers
    embers.material.opacity = Math.min(.85, t / 3);
    const p = eg.attributes.position;
    for (let i = 0; i < EN; i++) { p.array[i*3+1] += ev[i] * dt; if (p.array[i*3+1] > 3.5) p.array[i*3+1] = -3.5; p.array[i*3] += Math.sin(now * .4 + i) * .1 * dt; }
    p.needsUpdate = true;

    renderer.render(scene, camera);
  }
  frame();
}
