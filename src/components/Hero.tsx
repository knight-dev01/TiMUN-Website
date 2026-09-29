import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useConferenceData } from '../context/ConferenceContext';
import { LogoBadge } from './LogoBadge';
import { HandArrow } from './gallery/HumanMarks';

interface HeroProps {
  onJoinBulletin: () => void;
  onExploreCommittees: () => void;
  onOpenResolutionBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onJoinBulletin,
  onExploreCommittees,
  onOpenResolutionBuilder
}) => {
  const { conferenceInfo, committees } = useConferenceData();
  const reduceMotion = useReducedMotion();



  return (
    <section id="hero" className="relative bg-white overflow-hidden">
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 pt-[104px] sm:pt-[130px] pb-10 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left — wordmark first, the logo IS the hero */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LogoBadge size="xl" />
            <p className="mt-5 text-[15px] font-bold uppercase tracking-widest text-[#dd0000]">
              {conferenceInfo.dates} · Yaba, Lagos
            </p>
            <h1 className="duo-section-title text-4xl sm:text-5xl leading-tight mt-2">
              Walk into the hall where youth run the world.
            </h1>
            <p className="text-[#777777] text-[17px] leading-relaxed mt-4 max-w-md">
              {committees.length} councils · 500+ delegates · one assembly.
              Students, corps members and young professionals take their seats
              as diplomats — from Yaba to the world.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-7">
              <motion.button
                onClick={onJoinBulletin}
                id="hero-btn-apply"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="duo-btn duo-btn-red"
              >
                <span>Get conference updates</span>
                <HandArrow className="w-8 h-5" />
              </motion.button>
              <button
                onClick={onExploreCommittees}
                id="hero-btn-committees"
                className="duo-btn duo-btn-ghost"
              >
                Explore councils
              </button>
            </div>
            <button
              onClick={onOpenResolutionBuilder}
              className="mt-3 text-[15px] font-bold text-[#00387d] underline underline-offset-4 cursor-pointer"
            >
              Open the resolution desk
            </button>
          </motion.div>

          {/* Right — invitation card */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="duo-card p-6 sm:p-8 sm:rotate-[0.6deg]"
          >
            <p className="text-[13px] font-bold uppercase tracking-widest text-[#777777]">
              Your invitation
            </p>
            <p className="duo-section-title text-2xl mt-2 leading-snug">
              {conferenceInfo.theme}
            </p>
            <div className="grid grid-cols-3 gap-3 mt-6 text-center">
              {[
                { value: conferenceInfo.stats.delegates || '500+', label: 'Delegates' },
                { value: String(committees.length || 8), label: 'Councils' },
                { value: conferenceInfo.stats.nations || '50+', label: 'Nations' },
              ].map(stat => (
                <div key={stat.label} className="rounded-xl bg-slate-50 border-2 border-slate-100 py-3">
                  <div className="duo-section-title text-xl">{stat.value}</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#777777]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border-2 border-[#f4a024] bg-[#fef6e7] px-4 py-3 mt-4 text-center">
              <p className="text-[13px] font-bold uppercase tracking-widest text-[#5f3a00]">
                Dates announced soon
              </p>
              <p className="text-[13px] text-[#777777] mt-1">
                The gavel falls at {conferenceInfo.venue} — join the bulletin to hear first.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gold ticker */}
      <div className="bg-[#f4a024] border-y-2 border-[#b56a00]">
        <p className="max-w-[1200px] mx-auto px-4 sm:px-6 py-2.5 text-center text-[13px] font-bold uppercase tracking-widest text-[#15305b]">
          Registration opens soon — join the bulletin to pick your country first
        </p>
      </div>
    </section>
  );
};
