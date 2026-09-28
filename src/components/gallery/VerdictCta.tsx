import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { HandArrow, HandCheck, Squiggle, Stamp } from './HumanMarks';

interface VerdictCtaProps {
  onOpenRegister: () => void;
}

/** Hand-circled word: wobbly SVG ellipse drawn around children. */
const Circled: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="relative inline-block whitespace-nowrap">
    <span className="relative z-10">{children}</span>
    <svg
      viewBox="0 0 120 40"
      preserveAspectRatio="none"
      className="absolute -inset-x-2 -inset-y-1 w-[calc(100%+16px)] h-[calc(100%+8px)] text-[#0BE149]"
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
        strokeDasharray="300"
        transform="rotate(-2 60 20)"
      />
    </svg>
  </span>
);

/**
 * Room 04 — Verdict. The closing podium: spotlight sweep, hand-circled
 * "verified", one-time entrance pulse, single soft register button.
 */
export const VerdictCta: React.FC<VerdictCtaProps> = ({ onOpenRegister }) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-3xl bg-[#041D50] text-white px-6 py-12 sm:p-14 text-center"
      >
        {/* Podium spotlight sweep */}
        {!reduceMotion && (
          <div className="absolute inset-y-0 w-1/3 podium-sweep bg-gradient-to-r from-transparent via-[#0BE149]/15 to-transparent" aria-hidden="true" />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 90% at 50% 110%, rgba(11,225,73,0.22), transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <Stamp className="text-amber-300">The record will show —</Stamp>
          <h2 className="vx-display text-3xl sm:text-5xl font-semibold mt-5 leading-tight">
            8 councils deliberated.
            <br />
            Every delegate <Circled>verified</Circled>.
          </h2>
          <Squiggle className="w-40 h-4 text-[#0BE149] mx-auto mt-4" />

          <ul className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-2 mt-6 text-sm text-white/80">
            {['Study guides in hand', 'Your country placard', 'Gala dinner included'].map(item => (
              <li key={item} className="flex items-center gap-2">
                <HandCheck className="w-5 h-5 text-[#0BE149]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <motion.button
              onClick={onOpenRegister}
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="vx-soft-btn bg-amber-400 text-slate-950 px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-amber-300 transition-colors shadow-xl inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Claim your placard — register</span>
              <HandArrow className="w-8 h-5" />
            </motion.button>
            <p className="vx-hand-note text-white/60 mt-4 rotate-[-1deg]">
              early birds get first pick of countries…
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
