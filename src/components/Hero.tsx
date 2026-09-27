import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Award, ChevronRight, Download, Sparkles, Shield, Clock } from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';
import { SafeImage } from './SafeImage';
import { NIGERIAN_PHOTOS } from '../data/mediaData';
import heroBg from '../assets/images/tumun_hero_bg_1786354167438.jpg';

interface HeroProps {
  onOpenRegister: () => void;
  onExploreCommittees: () => void;
  onOpenResolutionBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenRegister,
  onExploreCommittees,
  onOpenResolutionBuilder
}) => {
  const { conferenceInfo, committees } = useConferenceData();

  // Countdown to Nov 12, 2027
  const targetDate = new Date('2027-11-12T09:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

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
    <section id="hero" className="relative pt-28 pb-16 bg-white text-slate-900 overflow-hidden border-b border-slate-100">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Core Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Tag Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 text-[11px] font-bold uppercase tracking-widest rounded border border-amber-300 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <span>{conferenceInfo.dates}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-900 text-[11px] font-bold uppercase tracking-wider rounded border border-blue-200 shadow-xs">
                <Shield className="w-3.5 h-3.5 text-amber-600" />
                <span>Knowledge • Exposure • Opportunity</span>
              </div>
            </div>

            {/* Main Headline */}
            <div>
              <div className="text-xs sm:text-sm font-bold tracking-widest text-amber-700 uppercase font-sans mb-1">
                Official International Conference
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-blue-900 leading-[1.1] font-bold tracking-tight">
                Trinity International <br />
                <span className="italic text-amber-600">Model United Nations</span>
              </h1>
            </div>

            {/* Subtitle / Paragraph */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              A hybrid diplomatic simulation, youth development, leadership, and professional empowerment platform equipping students, NYSC corps members, and young professionals to lead beyond the classroom.
            </p>

            {/* Theme Banner Card */}
            <div className="p-4 rounded-lg bg-white border-l-4 border-amber-500 border-y border-r border-slate-200 shadow-xs flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Conference Theme
                </div>
                <div className="text-sm font-serif italic text-blue-900 font-semibold mt-0.5">
                  "{conferenceInfo.theme}"
                </div>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenRegister}
                id="hero-btn-apply"
                className="bg-blue-900 text-white px-7 py-3.5 rounded text-xs font-bold uppercase tracking-widest hover:bg-blue-800 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Register Delegate</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={onExploreCommittees}
                id="hero-btn-committees"
                className="border border-slate-300 bg-white text-slate-700 px-7 py-3.5 rounded text-xs font-bold uppercase tracking-widest hover:bg-slate-100 hover:border-blue-900 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Users className="w-4 h-4 text-blue-900" />
                <span>Explore Councils ({committees.length})</span>
              </button>

              <button
                onClick={onOpenResolutionBuilder}
                id="hero-btn-res-drafter"
                className="border border-amber-300 bg-amber-50 text-amber-900 px-5 py-3.5 rounded text-xs font-bold uppercase tracking-widest hover:bg-amber-100 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Resolution Builder</span>
              </button>
            </div>

            {/* Countdown Bar */}
            <div className="pt-3">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Countdown to Opening Session</span>
              </div>
              <div className="grid grid-cols-4 gap-2 max-w-sm">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Mins', value: timeLeft.minutes },
                  { label: 'Secs', value: timeLeft.seconds },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded p-2 text-center shadow-xs">
                    <div className="text-lg font-bold font-mono text-blue-900">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Campus Hero Visual & Key Metrics */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-lg relative overflow-hidden">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100">
                <img
                  src={heroBg}
                  alt="Trinity University Campus"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    Trinity University Campus
                  </div>
                  <div className="font-serif font-bold text-lg leading-snug text-slate-100">
                    {conferenceInfo.location}
                  </div>
                </div>
              </div>

              <div className="mt-3 p-3 bg-slate-50 rounded border border-slate-200 grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-xl font-bold font-serif text-blue-900">{conferenceInfo.stats.delegates || '450+'}</div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Delegates</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-serif text-blue-900">{committees.length || conferenceInfo.stats.committees}</div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Committees</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Nigeria in focus — photo strip */}
        <div className="mt-12">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Nigeria in focus
              </h3>
              <p className="text-xl font-serif font-bold text-slate-900">
                From Lagos to Abuja
              </p>
            </div>
            <a href="#media" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
              View all stories →
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
        </div>

        {/* Featured Councils — minimal */}
        <div className="mt-10 rounded-2xl border border-slate-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 gap-2">
            <div>
              <h3 className="text-slate-400 font-bold uppercase text-xs tracking-widest">
                Featured councils
              </h3>
              <p className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Select your forum for diplomatic debate
              </p>
            </div>
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
              1st Annual Session
            </div>
          </div>

          {committees.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {committees.slice(0, 3).map((comm) => (
                <div key={comm.id} className="p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all cursor-pointer">
                  <h4 className="font-bold text-sm text-slate-900 mb-1">
                    {comm.name} ({comm.acronym})
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                    {comm.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-slate-400 italic">
              No committees loaded yet. Use "Site Uploads" to add or import committees.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

