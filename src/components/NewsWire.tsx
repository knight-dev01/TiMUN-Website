import React from 'react';
import { useConferenceData } from '../context/ConferenceContext';

/**
 * TiMUN Wire — classic breaking-news ticker pinned to the top of the page.
 * Headlines stream continuously (marquee), pause on hover, click jumps
 * to Stories. Fed by published posts, so it updates itself.
 */
export const NewsWire: React.FC = () => {
  const { mediaPosts } = useConferenceData();
  const headlines = mediaPosts.slice(0, 6);
  if (headlines.length === 0) return null;
  const loop = [...headlines, ...headlines];

  const goStories = () => {
    document.getElementById('media')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white border-b-2 border-slate-100 overflow-hidden">
      <div className="flex items-stretch">
        <span className="shrink-0 z-10 inline-flex items-center gap-1.5 bg-[#dd0000] text-white text-[11px] font-bold uppercase tracking-widest px-3 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          TiMUN Wire
        </span>
        <div className="hall-ticker relative flex-1 overflow-hidden">
          <div className="hall-ticker-track flex w-max items-center h-full">
            {loop.map((post, i) => (
              <button
                key={`${post.id}-${i}`}
                onClick={goStories}
                className="flex items-center gap-2 px-6 py-2 text-[14px] font-semibold text-[#00387d] hover:text-[#dd0000] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#f4a024] shrink-0" aria-hidden="true" />
                <span className="truncate max-w-[70vw] sm:max-w-md">{post.title}</span>
              </button>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </div>
  );
};
