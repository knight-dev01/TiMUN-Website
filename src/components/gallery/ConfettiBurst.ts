/**
 * Tiny celebration physics: navy / amber / green paper bits with gravity,
 * drag and flutter — fired on registration success + newsletter signup.
 * No dependencies, one rAF loop, canvas removes itself. Skipped entirely
 * under prefers-reduced-motion.
 */

const COLORS = ['#00387d', '#dd0000', '#f4a024', '#54b77e', '#ffffff'];

interface Bit {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  vr: number;
  color: string;
  sway: number;
  phase: number;
}

export function fireConfetti(count = 90) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText =
    'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight * 0.32;
  const bits: Bit[] = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 9;
    return {
      x: cx + (Math.random() - 0.5) * 60,
      y: cy + (Math.random() - 0.5) * 30,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 5,
      w: 5 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      sway: 1 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
    };
  });

  const gravity = 0.32;
  const drag = 0.985;
  let frames = 0;
  const maxFrames = 150;

  const tick = (t: number) => {
    frames += 1;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let alive = false;
    for (const b of bits) {
      b.vy += gravity;
      b.vx *= drag;
      b.vy *= drag;
      b.x += b.vx + Math.sin(t / 300 + b.phase) * b.sway;
      b.y += b.vy;
      b.rot += b.vr;
      if (b.y < window.innerHeight + 30) alive = true;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      ctx.fillStyle = b.color;
      ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
      ctx.restore();
    }
    if ((alive && frames < maxFrames) || frames < 20) {
      requestAnimationFrame(tick);
    } else {
      canvas.remove();
    }
  };
  requestAnimationFrame(tick);
}
