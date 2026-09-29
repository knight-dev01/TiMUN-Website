import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useConferenceData } from '../context/ConferenceContext';

/**
 * TIMUN WIRE — breaking-news headline bar fed by published stories.
 * Rotates every 5s, pauses on hover, dots for manual control.
 * Clicking a headline jumps to the Stories section.
 */
export const NewsWire: React.FC = () => {
  const { mediaPosts } = useConferenceData();
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const headlines = mediaPosts.slice(0, 5);

  useEffect(() => {
    if (reduceMotion || paused || headlines.length < 2) return;
    const t = setInterval(() => setIndex(i => (i + 1) % headlines.length), 5000);
    return () => clearInterval(t);
  }, [reduceMotion, paused, headlines.length]);

  if (headlines.length === 0) return null;
  const current = headlines[index % headlines.length];

  const goStories = () => {
    document.getElementById('media')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <div
      className="bg-white border-b-2 border-slate-100"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-3">
        <span className="shrink-0 inline-flex items-center gap-1.5 bg-[#dd0000] text-white text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          TiMUN Wire
        </span>

        <button
          onClick={goStories}
          className="flex-1 min-w-0 text-left cursor-pointer group"
          aria-label="Read this story"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={current.id}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="block truncate text-[14px] font-medium text-[#00387d] group-hover:text-[#dd0000] transition-colors"
            >
              {current.title}
            </motion.span>
          </AnimatePresence>
        </button>

        {headlines.length > 1 && (
          <span className="shrink-0 hidden sm:flex items-center gap-1.5">
            {headlines.map((h, i) => (
              <button
                key={h.id}
                onClick={() => setIndex(i)}
                aria-label={`Headline ${i + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === index % headlines.length ? 'w-5 bg-[#dd0000]' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </span>
        )}
      </div>
    </div>
  );
};
