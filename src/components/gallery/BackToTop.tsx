import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { HandArrow } from './HumanMarks';

/**
 * Springy "back to the entrance" button. Appears after a full screen
 * of scrolling; pops in with a spring, tap gives tactile feedback.
 */
export const BackToTop: React.FC = () => {
  const [show, setShow] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          whileHover={reduceMotion ? undefined : { scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })}
          aria-label="Back to the entrance"
          className="vx-soft-btn fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-[#041D50] text-white pl-4 pr-3 py-3 shadow-2xl border border-white/20 cursor-pointer"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest">Entrance</span>
          <HandArrow className="w-7 h-4 -rotate-90 text-[#0BE149]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
