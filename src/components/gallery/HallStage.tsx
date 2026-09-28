import React, { useEffect, useRef } from 'react';

/** UN member-state flags dotted through the delegate haze. */
const DELEGATE_FLAGS = [
  '🇳🇬', '🇺🇸', '🇬🇧', '🇫🇷', '🇬🇭', '🇿🇦', '🇰🇪', '🇪🇬',
  '🇧🇷', '🇩🇪', '🇮🇳', '🇨🇦', '🇯🇵', '🇷🇼', '🇸🇳', '🇨🇮',
];

interface Particle {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  phase: number;
  alpha: number;
  green: boolean;
  flag: string | null;
}

/**
 * 2D delegate haze: rising dots (green/white) with UN member flags.
 * transform-free canvas paint; paused off-screen, on hidden tab,
 * on mobile-hidden hero, and under reduced-motion.
 */
export const DelegatesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;

    const seed = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 36 : 80;
      particles = Array.from({ length: count }, (_, i) => {
        const isFlag = i % 5 === 0; // every 5th delegate carries a flag
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: isFlag ? 9 : 0.8 + Math.random() * 2.2,
          speed: 0.12 + Math.random() * 0.4,
          drift: (Math.random() - 0.5) * 0.3,
          phase: Math.random() * Math.PI * 2,
          alpha: 0.25 + Math.random() * 0.55,
          green: Math.random() < 0.35,
          flag: isFlag
            ? DELEGATE_FLAGS[Math.floor(Math.random() * DELEGATE_FLAGS.length)]
            : null,
        };
      });
    };

    const tick = (t: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift + Math.sin(t / 2400 + p.phase) * 0.15;
        if (p.y < -20) {
          p.y = h + 16;
          p.x = Math.random() * w;
        }
        if (p.x < -20) p.x = w + 16;
        if (p.x > w + 20) p.x = -16;

        if (p.flag) {
          ctx.globalAlpha = Math.min(1, p.alpha + 0.25);
          ctx.font = `${p.r * 2}px serif`;
          ctx.fillText(p.flag, p.x - p.r, p.y + p.r);
        } else {
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.green ? '#0BE149' : '#ffffff';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries[0]?.isIntersecting ?? false;
        if (visible && !running && !document.hidden) {
          running = true;
          raf = requestAnimationFrame(tick);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );

    seed();
    raf = requestAnimationFrame(tick);
    observer.observe(canvas);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', seed);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', seed);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
};

/**
 * 2.5D assembly-hall stage in pure CSS: curved delegate-desk arcs,
 * two podium light-ray cones, and the delegate haze canvas.
 */
export const HallStage: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden hall-perspective" aria-hidden="true">
    {/* Curved desk arcs */}
    <div className="hall-ellipse absolute left-1/2 bottom-[-38%] -translate-x-1/2 w-[130%] h-[75%] opacity-70" />
    <div className="hall-ellipse absolute left-1/2 bottom-[-30%] -translate-x-1/2 w-[105%] h-[62%] opacity-50" />
    <div className="hall-ellipse absolute left-1/2 bottom-[-22%] -translate-x-1/2 w-[80%] h-[50%] opacity-30" />

    {/* Podium light-ray cones */}
    <div className="podium-cone absolute left-[16%] bottom-0 w-40 h-[46%] opacity-80" />
    <div className="podium-cone absolute right-[16%] bottom-0 w-40 h-[46%] opacity-60" />

    <DelegatesCanvas />
  </div>
);
