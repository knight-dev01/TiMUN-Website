import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';
import { SafeImage } from './SafeImage';
import { NIGERIAN_PHOTOS } from '../data/mediaData';
import { SiteGalleryBackground } from './gallery/SiteGalleryBackground';
import { HallStage } from './gallery/HallStage';
import { HandArrow, Squiggle, Stamp } from './gallery/HumanMarks';
import heroBg from '../assets/images/tumun_hero_bg_1786354167438.jpg';

interface HeroProps {
  onOpenRegister: () => void;
  onExploreCommittees: () => void;
  onOpenResolutionBuilder: () => void;
}

const HEADLINE_WORDS = ['Walk', 'into', 'the', 'hall', 'where', 'youth', 'run', 'the', 'world.'];

export const Hero: React.FC<HeroProps> = ({
  onOpenRegister,
  onExploreCommittees,
  onOpenResolutionBuilder
}) => {
  const { conferenceInfo, committees } = useConferenceData();
  const reduceMotion = useReducedMotion();

  // Mouse parallax (±18px spring) for the arrival room
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 36);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 36);
  };

  // Countdown to Nov 12, 2027
  const targetDate = new Date('2027-11-12T09:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const difference = targetDate - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <>
    <section
      id="hero"
      onMouseMove={handleMouse}
      className="relative pt-28 pb-16 text-white overflow-hidden bg-[#041D50]"
    >
      <SiteGalleryBackground localPoster={heroBg} />
      <HallStage />

      <motion.div
        style={reduceMotion ? undefined : { x: px, y: py }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left — arrival headline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-[#0BE149]">
              <Stamp className="text-white">
                {conferenceInfo.dates} · 1st annual session
              </Stamp>
            </div>

            <h1 className="vx-display text-4xl sm:text-6xl font-semibold leading-[1.05] tracking-tight">
              {HEADLINE_WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.28em]"
                  initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                >
                  {word === 'hall' ? (
                    <span className="italic text-[#0BE149]">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
              <span className="block mt-1">
                <span className="text-2xl sm:text-4xl font-medium text-white/90">
                  Trinity International Model United Nations
                </span>
              </span>
            </h1>
            <Squiggle className="w-40 h-4 text-amber-400" />

            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-xl">
              8 councils · 500+ delegates · one assembly hall. Students, NYSC corps
              members and young professionals take their seats as diplomats —
              from Lagos to Abuja to the world.
            </p>

            <p className="vx-hand-note rotate-[-1.5deg] text-amber-300 text-lg">
              — your placard is already waiting on the desk…
            </p>

            {/* CTAs */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <motion.button
                onClick={onOpenRegister}
                id="hero-btn-apply"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                className="vx-soft-btn bg-amber-400 text-slate-950 px-7 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-amber-300 transition-colors shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Take your seat — register</span>
                <HandArrow className="w-8 h-5" />
              </motion.button>

              <motion.button
                onClick={onExploreCommittees}
                id="hero-btn-committees"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                className="vx-soft-btn border border-white/30 bg-white/10 backdrop-blur text-white px-7 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Explore {committees.length} councils</span>
              </motion.button>

              <button
                onClick={onOpenResolutionBuilder}
                id="hero-btn-res-drafter"
                className="text-white/70 hover:text-white px-2 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors underline underline-offset-4 decoration-[#0BE149] cursor-pointer"
              >
                Open the resolution desk
              </button>
            </div>

            {/* Countdown — frosted */}
            <div className="pt-2">
              <div className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-2">
                The gavel falls in —
              </div>
              <div className="grid grid-cols-4 gap-2 max-w-sm">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Mins', value: timeLeft.minutes },
                  { label: 'Secs', value: timeLeft.seconds },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-2 text-center">
                    <div className="text-lg font-bold font-mono text-white">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] font-semibold text-white/60 uppercase tracking-wider">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — frosted hall card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-2xl relative overflow-hidden">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src={heroBg}
                  alt="Trinity University Campus"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041D50]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#0BE149] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Assembly venue</span>
                  </div>
                  <div className="vx-display font-semibold text-lg leading-snug">
                    {conferenceInfo.location}
                  </div>
                </div>
              </div>

              <div className="mt-3 p-3 bg-white/10 rounded-xl border border-white/15 grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-xl font-bold vx-display text-white">{conferenceInfo.stats.delegates || '500+'}</div>
                  <div className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">Delegates</div>
                </div>
                <div>
                  <div className="text-xl font-bold vx-display text-white">{committees.length || conferenceInfo.stats.committees}</div>
                  <div className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">Councils</div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[11px] text-white/70 px-1 pb-1">
                <Calendar className="w-3.5 h-3.5 text-[#0BE149]" />
                <span>{conferenceInfo.dates} · {conferenceInfo.venue}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>

    {/* Daylight foyer below the hall — Nigeria strip + councils */}
    <section className="relative pt-14 pb-16 bg-white text-slate-900 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Nigeria in focus
            </h2>
            <p className="text-xl vx-display font-semibold text-slate-900">
              From Lagos to Abuja
            </p>
          </div>
          <a href="#media" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1">
            View all stories <HandArrow className="w-7 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[NIGERIAN_PHOTOS.lagos, NIGERIAN_PHOTOS.abuja, NIGERIAN_PHOTOS.delegates].map((photo) => (
            <div key={photo.caption} className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 group">
              <SafeImage
                src={photo.src}
                alt={photo.caption}
                fallbackLabel="Nigeria"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-semibold">
                {photo.caption}
              </div>
            </div>
          ))}
        </div>

        {/* Featured councils — editorial list, not identical cards */}
        <div className="mt-10 rounded-2xl border border-slate-200 p-6 sm:p-8 vx-paper">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 gap-2">
            <div>
              <h3 className="text-slate-400 font-bold uppercase text-xs tracking-widest">
                Featured councils
              </h3>
              <p className="text-xl sm:text-2xl vx-display font-semibold text-slate-900">
                Choose where you will argue, bargain and belong
              </p>
            </div>
            <div className="vx-hand-note text-slate-500">
              all {committees.length} chambers open in November —
            </div>
          </div>

          {committees.length > 0 ? (
            <ol className="divide-y divide-dashed divide-slate-300">
              {committees.slice(0, 3).map((comm, i) => (
                <li key={comm.id} className={`flex gap-4 py-4 items-start ${i === 1 ? 'bg-amber-50/60 -mx-4 px-4 rotate-[0.3deg] rounded-xl' : ''}`}>
                  <span className="vx-display italic font-semibold text-2xl text-[#08307F] w-10 shrink-0">
                    0{i + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      {comm.name} ({comm.acronym})
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed mt-1 line-clamp-2">
                      {comm.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="text-xs text-slate-400 italic">
              No committees loaded yet. Use "Site Uploads" to add or import committees.
            </div>
          )}
        </div>
      </div>
    </section>
    </>
  );
};
