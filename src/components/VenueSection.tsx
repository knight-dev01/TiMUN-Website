import React from 'react';
import { TextReveal } from './gallery/TextReveal';
import { MapPin, Navigation, Hotel, Plane, Bus } from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';

export const VenueSection: React.FC = () => {
  const { conferenceInfo } = useConferenceData();

  return (
    <section id="venue" className="py-12 sm:py-20 bg-white relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[15px] font-bold uppercase tracking-widest text-[#dd0000]">
            Campus Location & Housing
          </p>
          <TextReveal
            text="Venue & Logistics"
            className="duo-section-title text-4xl sm:text-5xl mt-2"
          />
          <p className="text-[#777777] text-[17px] mt-3">
            Hosted at Trinity University, Yaba — in the heart of mainland Lagos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left: map + location */}
          <div className="lg:col-span-7 duo-card p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-[13px] font-bold uppercase tracking-widest text-[#5f3a00]">
                Primary Conference Center
              </span>
              <h3 className="duo-section-title text-2xl">
                {conferenceInfo.venue}
              </h3>
              <p className="text-sm text-[#777777]">
                Trinity University City Campus, Off Alara Street (Near Queens College), Yaba, Lagos
              </p>
              <a
                href="https://www.trinityuniversity.edu.ng/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#00387d] hover:text-[#dd0000] transition-colors"
              >
                <span>Visit trinityuniversity.edu.ng</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Stylized campus map */}
            <div className="relative rounded-xl overflow-hidden border-2 border-slate-200 h-72 bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
                alt="Lagos, Nigeria"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f4a024] text-[#15305b] px-4 py-2 rounded-xl font-bold text-[13px] border-2 border-[#5f3a00] flex items-center gap-1.5 shadow-lg">
                <MapPin className="w-4 h-4" />
                <span>Main Auditorium (TiMUN HQ)</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-xl border-2 border-slate-200 text-[13px] text-[#4b4b4b] flex justify-between items-center">
                <span>Shuttle buses run from partner hotels on all 3 days.</span>
                <a
                  href="https://maps.google.com/?q=Trinity+University+Yaba+Lagos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00387d] hover:underline font-bold flex items-center gap-1 shrink-0 ml-2"
                >
                  <span>Google Maps</span>
                  <Navigation className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Transport */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border-2 border-slate-100 flex gap-3">
                <Plane className="w-5 h-5 text-[#00387d] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#00387d] text-[15px]">Airport Route</h4>
                  <p className="text-[13px] text-[#777777] mt-0.5 leading-relaxed">
                    Fly into Murtala Muhammed International Airport (LOS), Ikeja — about
                    45 minutes from campus depending on traffic.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border-2 border-slate-100 flex gap-3">
                <Bus className="w-5 h-5 text-[#00387d] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#00387d] text-[15px]">Shuttle Service</h4>
                  <p className="text-[13px] text-[#777777] mt-0.5 leading-relaxed">
                    Complimentary delegate shuttles run every 20 minutes from partner hotels.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: hotels */}
          <div className="lg:col-span-5 duo-card p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#00387d] font-bold text-[15px]">
                <Hotel className="w-5 h-5 text-[#5f3a00]" />
                <span>Partner Hotel Discounts</span>
              </div>
              <span className="duo-chip !border-[#54b77e] !text-[#35794f]">
                Group Rate
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: 'Eko Hotel & Suites',
                  rate: 'Group rate on request',
                  desc: 'Flagship Victoria Island hotel with a dedicated TiMUN delegation desk and daily shuttle to Yaba.',
                  dist: 'Victoria Island, Lagos'
                },
                {
                  name: 'Radisson Blu Ikeja',
                  rate: 'Group rate on request',
                  desc: 'Closest to the airport — ideal for out-of-state delegates flying into LOS.',
                  dist: 'Ikeja GRA, Lagos'
                }
              ].map((hotel) => (
                <div key={hotel.name} className="p-4 bg-slate-50 rounded-xl border-2 border-slate-100 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="duo-section-title text-[15px]">{hotel.name}</h4>
                    <span className="font-bold text-[#5f3a00] text-[13px] whitespace-nowrap">{hotel.rate}</span>
                  </div>
                  <p className="text-[13px] text-[#777777] leading-relaxed">{hotel.desc}</p>
                  <div className="text-[11px] text-[#afafaf] font-bold uppercase tracking-wider">{hotel.dist}</div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#fdeecd] rounded-xl border-2 border-[#f4a024] text-[13px] text-[#5f3a00] space-y-1.5 leading-relaxed">
              <div className="font-bold uppercase tracking-wider">How to book:</div>
              <p>
                Mention <strong>"TiMUN 2027 delegate block"</strong> when reserving, or use
                the booking link in your registration confirmation email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
