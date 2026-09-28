import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { HandArrow } from './HumanMarks';

export interface RoomStop {
  id: string;
  index: string;
  label: string;
}

export const ROOM_STOPS: RoomStop[] = [
  { id: 'hero', index: '01', label: 'Arrival' },
  { id: 'overview', index: '02', label: 'Mandate' },
  { id: 'committees', index: '03', label: 'Assembly' },
  { id: 'faq', index: '04', label: 'Verdict' },
];

/**
 * Fixed left progress rail (lg screens only): room stops + spring
 * scroll line. Includes the "Walk the hall" auto-tour.
 */
export const HallProgress: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  const [touring, setTouring] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      let current = ROOM_STOPS[0].id;
      for (const stop of ROOM_STOPS) {
        const el = document.getElementById(stop.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) {
          current = stop.id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-tour: chain rooms every ~2.6s; stop on interaction.
  useEffect(() => {
    if (!touring || reduceMotion) return;
    let i = ROOM_STOPS.findIndex(s => s.id === active);
    if (i < 0) i = 0;
    const step = () => {
      i += 1;
      if (i >= ROOM_STOPS.length) {
        setTouring(false);
        return;
      }
      document.getElementById(ROOM_STOPS[i].id)?.scrollIntoView({ behavior: 'smooth' });
      timer = window.setTimeout(step, 2600);
    };
    let timer = window.setTimeout(step, 2600);

    const stop = () => setTouring(false);
    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('touchmove', stop, { passive: true });
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') stop();
    });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchmove', stop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touring]);

  if (reduceMotion) return null;

  const go = (id: string) => {
    setTouring(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Conference hall walkthrough"
      className="hidden lg:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 flex-col items-start gap-1"
    >
      {/* Spring progress line */}
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/15 overflow-hidden rounded">
        <motion.div className="w-full h-full origin-top bg-[#0BE149]" style={{ scaleY }} />
      </div>

      {ROOM_STOPS.map(stop => (
        <button
          key={stop.id}
          onClick={() => go(stop.id)}
          className="group flex items-center gap-3 py-1.5 pl-0 pr-2 cursor-pointer"
        >
          <span
            className={`w-[15px] h-[15px] rotate-45 border transition-colors ${
              active === stop.id
                ? 'bg-[#0BE149] border-[#0BE149]'
                : 'bg-transparent border-white/40 group-hover:border-white'
            }`}
          />
          <span
            className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${
              active === stop.id ? 'text-white' : 'text-white/50 group-hover:text-white/90'
            }`}
          >
            {stop.index} · {stop.label}
          </span>
        </button>
      ))}

      <button
        onClick={() => setTouring(t => !t)}
        className="mt-3 flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/25 text-white text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer vx-soft-btn"
      >
        <HandArrow className="w-6 h-4 text-[#0BE149]" />
        <span>{touring ? 'Pause the walk' : 'Walk the hall'}</span>
      </button>
    </nav>
  );
};
