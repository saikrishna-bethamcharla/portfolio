/* hero-name-3d.js — cinematic 3D name animation (Three.js, Cinzel Black embedded)
   Needs an importmap for "three" and "three/addons/" (see index snippet). */
import * as THREE from 'three';
import { TTFLoader } from 'three/addons/loaders/TTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const NAME = 'SAI KRISHNA';
const FONT_B64 = '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';

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
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);
  renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 1.35;

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 200);

  /* ---------- font: Monumental Architectural Monolith (Anton) ---------- */
  let buf;
  try {
    const res = await fetch('./fonts/anton.ttf');
    if (!res.ok) throw new Error('Local font fetch failed');
    buf = await res.arrayBuffer();
  } catch {
    buf = await (await fetch('https://fonts.gstatic.com/s/anton/v27/1Ptgg87LROyAm0K0.ttf')).arrayBuffer();
  }
  const font = new FontLoader().parse(new TTFLoader().parse(buf));
  const SIZE = 1, TRACK = 0.09;
  const scaleF = SIZE / font.data.resolution;
  const adv = ch => (font.data.glyphs[ch] || font.data.glyphs['?']).ha * scaleF;

  /* ---------- material: smoked liquid obsidian chrome with razor PVD titanium bevels ---------- */
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xf5f7fa,
    metalness: 0.98,
    roughness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.45,
    reflectivity: 0.98,
  });
  const sideMat = new THREE.MeshPhysicalMaterial({
    color: 0x12141a,
    metalness: 0.94,
    roughness: 0.28,
    envMapIntensity: 0.95,
    clearcoat: 0.35,
    clearcoatRoughness: 0.18,
  });

  /* ---------- lights ---------- */
  const key = new THREE.DirectionalLight(0xfff5ee, 3.8); key.position.set(-5, 7, 9); scene.add(key);
  const fill = new THREE.DirectionalLight(0x7090ff, 0.65); fill.position.set(7, -3, 6); scene.add(fill);
  const rimL = new THREE.PointLight(0xff2212, 110, 0, 2); scene.add(rimL);
  const rimR = new THREE.PointLight(0xff3018, 110, 0, 2); scene.add(rimR);
  const under = new THREE.PointLight(0xff1808, 22, 0, 2); scene.add(under);
  const sweep = new THREE.PointLight(0xffffff, 0, 0, 2); scene.add(sweep);

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
          const g = new TextGeometry(c, { font, size: SIZE, depth: 0.38, height: 0.38, curveSegments: 8,
            bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.032, bevelSegments: 3 });
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
    let sI = flash * 55;
    if (settledAt !== null) {
      const c = ((t - settledAt) % 7.5) / 2.6;               // 0..1 during sweep, >1 rests
      if (c < 1) { sweep.position.set(THREE.MathUtils.lerp(-layout.W * .6, layout.W * .6, c), 0.4, 2.4); sI = Math.sin(c * Math.PI) * 70; }
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
