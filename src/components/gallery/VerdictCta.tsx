import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { HandArrow, HandCheck } from './HumanMarks';

interface VerdictCtaProps {
  onJoinBulletin: () => void;
}

/** Hand-circled word: wobbly gold ellipse drawn around children. */
const Circled: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="relative inline-block whitespace-nowrap">
    <span className="relative z-10">{children}</span>
    <svg
      viewBox="0 0 120 40"
      preserveAspectRatio="none"
      className="absolute -inset-x-2 -inset-y-1 w-[calc(100%+16px)] h-[calc(100%+8px)] text-[#dd0000]"
      aria-hidden="true"
    >
      <ellipse
        cx="60"
        cy="20"
        rx="56"
        ry="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        transform="rotate(-2 60 20)"
      />
    </svg>
  </span>
);

/**
 * Verdict band — solid TU navy, gold circled "verified",
 * single red 3D-press register button.
 */
export const VerdictCta: React.FC<VerdictCtaProps> = ({ onJoinBulletin }) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-20">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-[20px] bg-white px-6 py-12 sm:p-14 text-center border-2 border-slate-200"
      >
        <div className="relative">
          <p className="text-[15px] font-bold uppercase tracking-widest text-[#dd0000]">
            The record will show —
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold mt-4 leading-tight" style={{ fontFamily: "'Nunito Sans', system-ui, sans-serif", color: '#00387d' }}>
            8 councils deliberated.
            <br />
            Every delegate <Circled>verified</Circled>.
          </h2>

          <ul className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-2 mt-6 text-[15px] text-[#4b4b4b]">
            {['Study guides in hand', 'Your country placard', 'Gala dinner included'].map(item => (
              <li key={item} className="flex items-center gap-2">
                <HandCheck className="w-5 h-5 text-[#f4a024]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <motion.button
              onClick={onJoinBulletin}
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="duo-btn duo-btn-red !px-8 !py-4"
            >
              <span>Notify me when seats open</span>
              <HandArrow className="w-8 h-5" />
            </motion.button>
            <p className="vx-hand-note text-[#777777] mt-4">
              early birds get first pick of countries…
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
