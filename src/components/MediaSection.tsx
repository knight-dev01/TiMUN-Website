import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Newspaper, PlayCircle, Image as ImageIcon, Megaphone, X, Calendar, User, Tag, Clock } from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';
import { MediaKind, MediaPost } from '../types';
import { SafeImage } from './SafeImage';
import { TextReveal } from './gallery/TextReveal';
import { trackEvent } from '../lib/analytics';

/** Convert a YouTube watch/share URL to a privacy-friendly nocookie embed. */
export function toYouTubeEmbed(url: string): string {
  if (!url) return '';
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}`;
  if (url.includes('youtube-nocookie.com/embed') || url.includes('youtube.com/embed')) return url;
  return '';
}

const KIND_META: Record<MediaKind, { label: string; icon: any }> = {
  article: { label: 'Article', icon: Newspaper },
  update: { label: 'Update', icon: Megaphone },
  video: { label: 'Video', icon: PlayCircle },
  photo: { label: 'Photos', icon: ImageIcon },
};

function KindBadge({ kind }: { kind: MediaKind }) {
  const Icon = KIND_META[kind].icon;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00387d] text-white text-[10px] font-bold uppercase tracking-widest">
      <Icon className="w-3 h-3 text-[#f4a024]" />
      <span>{KIND_META[kind].label}</span>
    </span>
  );
}

export const MediaSection: React.FC = () => {
  const { mediaPosts } = useConferenceData();
  const [filter, setFilter] = useState<'all' | MediaKind>('all');
  const [openPost, setOpenPost] = useState<MediaPost | null>(null);

  const filtered = useMemo(
    () => (filter === 'all' ? mediaPosts : mediaPosts.filter(p => p.kind === filter)),
    [mediaPosts, filter]
  );
  const featured = useMemo(() => mediaPosts.find(p => p.featured) || mediaPosts[0], [mediaPosts]);
  const rest = useMemo(() => filtered.filter(p => featured && p.id !== featured.id), [filtered, featured]);

  const open = (post: MediaPost) => {
    setOpenPost(post);
    trackEvent('media_post_opened', { kind: post.kind, id: post.id });
  };

  const filters: { id: 'all' | MediaKind; label: string }[] = [
    { id: 'all', label: 'All stories' },
    { id: 'article', label: 'Articles' },
    { id: 'update', label: 'Updates' },
    { id: 'video', label: 'Videos' },
    { id: 'photo', label: 'Photos' },
  ];

  return (
    <section id="media" className="py-20 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-[#8a5200] mb-2">
            Insights & Media
          </div>
          <TextReveal
            text="Stories, guides & moments"
            className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight"
          />
          <p className="text-slate-500 mt-3 text-sm sm:text-base leading-relaxed">
            Articles and write-ups from the Secretariat, conference updates, briefing videos
            and photo stories — from Lagos to Abuja and everywhere our delegates call home.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                filter === f.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-sm text-slate-400 bg-slate-50 border border-slate-100 rounded-lg p-8 text-center">
            No stories here yet. Executives can publish from the Secretariat portal.
          </p>
        )}

        {/* Featured story */}
        {featured && (filter === 'all' || featured.kind === filter) && (
          <button
            onClick={() => open(featured)}
            className="w-full text-left grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-slate-200 mb-8 hover:border-slate-300 hover:shadow-lg transition-all cursor-pointer group bg-white"
          >
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px] overflow-hidden bg-slate-100">
              <SafeImage
                src={featured.coverImage}
                alt={featured.title}
                fallbackLabel="TiMUN Stories"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <KindBadge kind={featured.kind} />
              <h3 className="font-serif font-bold text-2xl text-slate-900 mt-4 leading-tight">
                {featured.title}
              </h3>
              <p className="text-sm text-slate-500 mt-3 leading-relaxed line-clamp-3">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 mt-5 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{featured.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
              </div>
            </div>
          </button>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filter === 'all' ? rest : filtered.filter(p => !featured || p.id !== featured.id)).map(post => (
            <button
              key={post.id}
              onClick={() => open(post)}
              className="text-left rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <SafeImage
                  src={post.coverImage}
                  alt={post.title}
                  fallbackLabel="TiMUN"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3"><KindBadge kind={post.kind} /></div>
                {post.kind === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <PlayCircle className="w-7 h-7 text-slate-900" />
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-serif font-bold text-lg text-slate-900 leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[13px] text-slate-500 mt-2 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-4 text-[11px] text-slate-400">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reader modal */}
      {openPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60" onClick={() => setOpenPost(null)}>
          <motion.div
            initial={{ opacity: 0, y: 44, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-[21/9] bg-slate-100 overflow-hidden rounded-t-2xl">
              <SafeImage
                src={openPost.coverImage}
                alt={openPost.title}
                fallbackLabel="TiMUN"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                onClick={() => setOpenPost(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-slate-700 hover:text-slate-900 cursor-pointer"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-10">
              <KindBadge kind={openPost.kind} />
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 mt-4 leading-tight">
                {openPost.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{openPost.author}{openPost.authorRole ? ` • ${openPost.authorRole}` : ''}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{openPost.date}</span>
                {openPost.tags.length > 0 && (
                  <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" />{openPost.tags.join(', ')}</span>
                )}
              </div>

              {/* Video */}
              {openPost.kind === 'video' && (
                <div className="mt-6">
                  {toYouTubeEmbed(openPost.videoUrl) ? (
                    <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-video">
                      <iframe
                        src={toYouTubeEmbed(openPost.videoUrl)}
                        title={openPost.title}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Video premieres soon — check back closer to the conference.</span>
                    </div>
                  )}
                </div>
              )}

              {/* Photo gallery */}
              {openPost.kind === 'photo' && openPost.gallery.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {openPost.gallery.map((src, i) => (
                    <div key={i} className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-100">
                      <SafeImage src={src} alt={`${openPost.title} — photo ${i + 1}`} fallbackLabel="TiMUN" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* Body */}
              <div className="mt-6 space-y-4">
                {openPost.body.split(/\n\n+/).map((para, i) => (
                  <p key={i} className="text-[15px] text-slate-600 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
