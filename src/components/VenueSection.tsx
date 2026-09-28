import React from 'react';
import { MapPin, Navigation, Hotel, Plane, Bus, ShieldCheck } from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';

export const VenueSection: React.FC = () => {
  const { conferenceInfo } = useConferenceData();

  return (
    <section id="venue" className="py-20 vx-paper text-slate-900 border-b border-amber-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-bold uppercase tracking-widest mb-3">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            <span>Campus Location & Housing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900 tracking-tight">
            Venue & Logistics
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            Hosted on the historic campus of Trinity University in San Antonio, Texas.
          </p>
        </div>

        {/* Venue Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Map Placeholder & Location Info */}
          <div className="lg:col-span-7 bg-white rounded border border-slate-200 p-6 space-y-6 shadow-xs">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Primary Conference Center
              </span>
              <h3 className="font-serif font-bold text-2xl text-blue-900">
                {conferenceInfo.venue}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                1 Trinity Place, San Antonio, TX 78212 • Trinity University Historic Quadrangle
              </p>
            </div>


            {/* Stylized Campus Map View */}
            <div className="relative rounded overflow-hidden border border-slate-300 h-72 bg-blue-950">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
                alt="San Antonio Map"
                className="w-full h-full object-cover filter brightness-75 contrast-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/40 to-transparent" />

              {/* Map Pins */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-400 text-slate-950 px-3 py-1.5 rounded font-bold text-xs shadow-md border border-amber-300 flex items-center gap-1.5 animate-bounce">
                <MapPin className="w-4 h-4 fill-slate-950" />
                <span>Laurie Auditorium (TiMUN HQ)</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 p-3 rounded border border-slate-700 text-xs text-slate-200 flex justify-between items-center">
                <span>Free parking available at Laurie Garage for delegates & advisors.</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline font-bold flex items-center gap-1 shrink-0 ml-2"
                >
                  <span>Google Maps</span>
                  <Navigation className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Transport Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded border border-slate-200 flex gap-3">
                <Plane className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-900 text-xs">Airport Proximity</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    12 minutes (8 miles) from San Antonio International Airport (SAT).
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded border border-slate-200 flex gap-3">
                <Bus className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-900 text-xs">Shuttle Service</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Complimentary delegate shuttles run every 20 mins from partner hotels.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hotel Partner Deals */}
          <div className="lg:col-span-5 bg-white rounded border border-slate-200 p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <Hotel className="w-5 h-5 text-amber-600" />
                <span>Partner Hotel Discounts</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold uppercase tracking-wider">
                Group Rate
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "Marriott Plaza San Antonio",
                  rate: "$129 / night",
                  desc: "Includes hot buffet breakfast & complimentary shuttle to Trinity campus quad.",
                  dist: "1.2 miles from campus"
                },
                {
                  name: "Hotel Emma (Pearl District)",
                  rate: "$179 / night",
                  desc: "Boutique hotel in the historic Pearl District with special delegation block rates.",
                  dist: "0.8 miles from campus"
                }
              ].map((hotel, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded border border-slate-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-serif font-bold text-blue-900 text-sm">{hotel.name}</h4>
                    <span className="font-mono font-bold text-amber-700 text-xs">{hotel.rate}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{hotel.desc}</p>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{hotel.dist}</div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-amber-50 rounded border border-amber-300 text-xs text-amber-900 space-y-1.5 leading-relaxed">
              <div className="font-bold text-amber-900 uppercase tracking-wider">How to Book Group Hotel Block:</div>
              <p>
                Mention <strong>"Trinity Model UN 2026 Block"</strong> when calling hotel reservations or use the booking link provided in your registration email.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
