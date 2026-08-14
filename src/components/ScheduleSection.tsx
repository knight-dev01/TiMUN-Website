import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Shirt, Sparkles, Filter, Download } from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';

export const ScheduleSection: React.FC = () => {
  const { schedule } = useConferenceData();
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const activeDay = schedule.find(d => d.dayNumber === selectedDay) || schedule[0] || {
    dayNumber: 1,
    title: 'Day 1',
    date: 'Friday',
    items: []
  };

  const filteredItems = activeDay.items.filter((item) => {
    if (typeFilter === 'all') return true;
    return item.type === typeFilter;
  });

  return (
    <section id="schedule" className="py-20 bg-white text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-bold uppercase tracking-widest mb-3">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>Itinerary & Official Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900 tracking-tight">
            Conference Schedule
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            {schedule.length} packed days of diplomatic debate, keynote addresses, committee caucuses, and social events.
          </p>
        </div>

        {/* Day Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-slate-100 rounded border border-slate-200">
            {schedule.map((day) => (
              <button
                key={day.dayNumber}
                onClick={() => setSelectedDay(day.dayNumber)}
                className={`px-4 sm:px-6 py-2.5 rounded text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedDay === day.dayNumber
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-blue-900'
                }`}
              >
                <span>Day {day.dayNumber}</span>
                <span className="hidden sm:inline text-[11px] opacity-80 ml-1.5">({day.date.split(',')[0]})</span>
              </button>
            ))}
          </div>
        </div>


        {/* Type Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Events' },
            { id: 'session', label: 'Committee Sessions' },
            { id: 'ceremony', label: 'Ceremonies & Keynotes' },
            { id: 'social', label: 'Socials & Gala' },
            { id: 'workshop', label: 'Workshops' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setTypeFilter(type.id)}
              className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                typeFilter === type.id
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-50 rounded border border-slate-200 hover:border-blue-900 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 font-mono tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{item.time}</span>
                </div>

                <h3 className="font-serif font-bold text-blue-900 text-base sm:text-lg">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-900" />
                    <span>{item.location}</span>
                  </span>

                  {item.dressCode && (
                    <span className="flex items-center gap-1 text-amber-800 font-semibold">
                      <Shirt className="w-3 h-3" />
                      <span>{item.dressCode}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="shrink-0">
                <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  item.type === 'session' ? 'bg-blue-900 text-white' :
                  item.type === 'ceremony' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                  item.type === 'social' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                  'bg-slate-200 text-slate-800'
                }`}>
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
