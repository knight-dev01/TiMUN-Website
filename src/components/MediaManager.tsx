import React, { useState } from 'react';
import { Plus, Trash2, Download, Star, Mail } from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';
import { MediaKind, MediaPost } from '../types';
import { subscribersToCsv } from '../lib/newsletter';

const EMPTY = {
  kind: 'article' as MediaKind,
  title: '',
  excerpt: '',
  body: '',
  coverImage: '',
  videoUrl: '',
  gallery: '',
  author: '',
  authorRole: '',
  tags: '',
  featured: false,
};

export const MediaManager: React.FC<{ notify: (t: 'success' | 'error', m: string) => void }> = ({ notify }) => {
  const { mediaPosts, addMediaPost, deleteMediaPost, updateMediaPost, subscribers, refreshSubscribers, removeSubscriber } = useConferenceData();
  const [form, setForm] = useState(EMPTY);

  const set = (k: keyof typeof EMPTY, v: string | boolean) =>
    setForm(prev => ({ ...prev, [k]: v } as typeof EMPTY));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.excerpt.trim()) {
      notify('error', 'Title and excerpt are required.');
      return;
    }
    const post: MediaPost = {
      id: `post-${Date.now().toString(36)}`,
      kind: form.kind,
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      body: form.body.trim() || form.excerpt.trim(),
      coverImage: form.coverImage.trim(),
      videoUrl: form.videoUrl.trim(),
      gallery: form.gallery.split('\n').map(s => s.trim()).filter(Boolean),
      author: form.author.trim() || 'TiMUN Secretariat',
      authorRole: form.authorRole.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: Date.now(),
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      featured: form.featured,
    };
    addMediaPost(post);
    setForm(EMPTY);
    notify('success', `"${post.title}" published to Insights & Media.`);
  };

  const downloadSubs = () => {
    refreshSubscribers();
    const blob = new Blob([subscribersToCsv(subscribers)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timun-newsletter-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputCls = 'w-full bg-white border-slate-300 rounded-xl p-2 text-xs text-slate-800 focus:border-[#f4a024] outline-none';

  return (
    <div className="space-y-8">
      {/* Publish form */}
      <form onSubmit={handleAdd} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#b56a00] flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Publish: article / update / video / photos</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <select value={form.kind} onChange={e => set('kind', e.target.value)} className={inputCls}>
            <option value="article">Article / write-up</option>
            <option value="update">Update / announcement</option>
            <option value="video">Video</option>
            <option value="photo">Photo story</option>
          </select>
          <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Title *" className={inputCls} />
        </div>
        <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} placeholder="Short excerpt (shows on cards) *" rows={2} className={inputCls} />
        <textarea value={form.body} onChange={e => set('body', e.target.value)} placeholder="Full text — separate paragraphs with a blank line" rows={4} className={inputCls} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <input value={form.coverImage} onChange={e => set('coverImage', e.target.value)} placeholder="Cover image URL (https://…)" className={inputCls} />
          <input value={form.videoUrl} onChange={e => set('videoUrl', e.target.value)} placeholder="YouTube URL (videos only)" className={inputCls} />
        </div>
        <textarea value={form.gallery} onChange={e => set('gallery', e.target.value)} placeholder="Photo stories: one image URL per line" rows={2} className={inputCls} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <input value={form.author} onChange={e => set('author', e.target.value)} placeholder="Author name" className={inputCls} />
          <input value={form.authorRole} onChange={e => set('authorRole', e.target.value)} placeholder="Author role (e.g. USG Media)" className={inputCls} />
          <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="Tags (comma separated)" className={inputCls} />
        </div>
        <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="rounded-xl" />
          <span>Feature this story at the top of Insights & Media</span>
        </label>
        <button type="submit" className="px-5 py-2.5 bg-[#f4a024] hover:bg-[#f7b955] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer">
          Publish story
        </button>
      </form>

      {/* Existing posts */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Published ({mediaPosts.length})</h4>
        {mediaPosts.map(p => (
          <div key={p.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-wrap items-center gap-3 text-xs">
            <div className="flex-1 min-w-[200px]">
              <div className="font-bold text-slate-800">{p.title}</div>
              <div className="text-slate-500">{p.kind} • {p.author} • {p.date}</div>
            </div>
            <button
              onClick={() => { updateMediaPost(p.id, { featured: !p.featured }); notify('success', p.featured ? 'Unfeatured.' : 'Set as featured story.'); }}
              title="Toggle featured"
              className={`p-2 rounded-xl cursor-pointer ${p.featured ? 'text-[#b56a00] bg-[#f4a024]/10' : 'text-slate-500 hover:text-[#b56a00]'}`}
            >
              <Star className="w-4 h-4" fill={p.featured ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={() => { if (window.confirm(`Delete "${p.title}"?`)) { deleteMediaPost(p.id); notify('success', 'Story deleted.'); } }}
              className="p-2 rounded-xl text-[#dd0000] hover:bg-[#fde2e2] cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Newsletter subscribers */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#b56a00] flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>Bulletin subscribers ({subscribers.length})</span>
          </h4>
          <div className="flex gap-2">
            <button onClick={() => { refreshSubscribers(); notify('success', 'Subscriber list refreshed.'); }} className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-xs font-bold cursor-pointer">
              Refresh
            </button>
            <button onClick={downloadSubs} className="px-3 py-1.5 rounded-xl bg-[#f4a024] hover:bg-[#f7b955] text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
        {subscribers.length === 0 ? (
          <p className="text-[11px] text-slate-500">No subscribers yet. Sign-ups from the footer bulletin appear here.</p>
        ) : (
          <div className="max-h-48 overflow-y-auto space-y-1.5">
            {subscribers.map(s => (
              <div key={s.id} className="flex items-center justify-between text-xs bg-slate-100 rounded-xl px-3 py-1.5">
                <span className="text-slate-700">{s.email}{s.name ? ` • ${s.name}` : ''}</span>
                <span className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase ${s.synced ? 'text-emerald-400' : 'text-[#f4a024]'}`}>
                    {s.synced ? 'synced' : 'local'}
                  </span>
                  <button onClick={() => { removeSubscriber(s.id); notify('success', 'Subscriber removed.'); }} className="text-[#dd0000] hover:text-[#a80e0e] cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}
        <p className="text-[11px] text-slate-500">
          No backend needed: sign-ups save locally and export to CSV. Set VITE_NEWSLETTER_ENDPOINT
          (Formspree / Brevo) to also sync each signup to your email service automatically.
        </p>
      </div>
    </div>
  );
};
