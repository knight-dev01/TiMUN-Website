import React, { useState } from 'react';
import { Globe, Mail, Phone, MapPin, Send, CheckCircle2, Shield, Heart, Loader2 } from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';
import { subscribeNewsletter } from '../lib/newsletter';
import { fireConfetti } from './gallery/ConfettiBurst';
import { Watermark } from './gallery/Watermark';

interface FooterProps {
  onOpenRegister: () => void;
  onOpenResolutionBuilder: () => void;
  onOpenCms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRegister, onOpenResolutionBuilder, onOpenCms }) => {
  const { conferenceInfo, isExecutive, refreshSubscribers } = useConferenceData();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<'idle' | 'busy' | 'done' | 'duplicate' | 'invalid'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterState('busy');
    const res = await subscribeNewsletter(newsletterEmail, '', 'footer');
    refreshSubscribers();
    if (res.status === 'invalid') {
      setNewsletterState('invalid');
    } else if (res.status === 'duplicate') {
      setNewsletterState('duplicate');
    } else {
      setNewsletterState('done');
      setNewsletterEmail('');
      fireConfetti(60);
    }
    setTimeout(() => setNewsletterState(prev => (prev === 'busy' ? prev : 'idle')), 5000);
  };

  return (
    <footer id="bulletin" className="relative overflow-hidden bg-[#15305b] text-slate-300 text-xs border-t border-[#00387d]">
      <Watermark side="left" dark opacity={0.08} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="TiMUN Logo" 
                className="h-10 w-auto object-contain bg-white/10 p-1 rounded" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div>
                <div className="font-serif font-bold text-base text-white tracking-wide uppercase">
                  {conferenceInfo.title || 'Trinity International MUN'}
                </div>
                <div className="text-[10px] text-[#f4a024] font-bold uppercase tracking-widest">
                  Knowledge • Exposure • Opportunity
                </div>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed max-w-sm">
              A hybrid diplomatic simulation, youth development, leadership, and professional empowerment platform equipping youth to shape the future of diplomacy and governance.
            </p>

            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#f4a024] shrink-0" />
                <span>Trinity University • Associate Institution</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#f4a024] shrink-0" />
                <span>secretariat@timun.org</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#overview" className="hover:text-[#f4a024] transition-colors">About TiMUN</a></li>
              <li><a href="#media" className="hover:text-[#f4a024] transition-colors">Stories & Updates</a></li>
              <li><a href="#venue" className="hover:text-[#f4a024] transition-colors">Venue in Yaba, Lagos</a></li>
              <li><a href="#coming-soon" className="hover:text-[#f4a024] transition-colors">More Rooms (Pending)</a></li>
              <li><a href="#faq" className="hover:text-[#f4a024] transition-colors">Questions & Contact</a></li>
            </ul>
          </div>

          {/* Delegate Resources */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider">
              Delegate Portal
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={onOpenRegister} className="hover:text-[#f4a024] transition-colors text-left cursor-pointer">
                  Apply as Delegate
                </button>
              </li>
              <li>
                <button onClick={onOpenResolutionBuilder} className="hover:text-[#f4a024] transition-colors text-left text-[#f7b955] font-bold cursor-pointer">
                  Resolution Builder Tool
                </button>
              </li>
              <li><a href="#faq" className="hover:text-[#f4a024] transition-colors">Frequently Asked Questions</a></li>
              {onOpenCms && (
                <li className="pt-1">
                  <button
                    onClick={onOpenCms}
                    className="text-[#f4a024] font-semibold hover:text-[#f7b955] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 text-[#f4a024]" />
                    <span>{isExecutive ? 'Executive Secretariat Portal' : 'Executive Secretariat Login'}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider">
              Conference Bulletin
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              One short email when study guides drop, when countries are assigned,
              and when gala details land. No noise, unsubscribe anytime.
            </p>

            {newsletterState === 'done' ? (
              <div className="p-3 bg-[#00387d]/80 rounded border border-[#f4a024]/40 text-[#f7b955] text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>You are on the list — see you in the hall.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="delegate@email.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#00387d]/60 border border-[#294a70] rounded px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#f4a024]"
                />
                <button
                  type="submit"
                  disabled={newsletterState === 'busy'}
                  className="w-full py-2 rounded font-bold uppercase tracking-wider text-xs text-slate-950 bg-[#f4a024] hover:bg-[#f7b955] transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs disabled:opacity-60"
                >
                  {newsletterState === 'busy' ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Send className="w-3 h-3 text-slate-950" />
                  )}
                  <span>{newsletterState === 'busy' ? 'Subscribing…' : 'Subscribe Bulletin'}</span>
                </button>
                {newsletterState === 'duplicate' && (
                  <p className="text-[11px] text-[#f7b955]">This email is already subscribed.</p>
                )}
                {newsletterState === 'invalid' && (
                  <p className="text-[11px] text-rose-300">Please enter a valid email address.</p>
                )}
              </form>
            )}
          </div>

        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#00387d] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © 2027 Trinity International Model United Nations (TiMUN). Independently founded & managed. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <Shield className="w-3.5 h-3.5 text-[#f4a024] shrink-0" />
            <span>TiMUN is an independent diplomatic simulation and youth empowerment platform in association with Trinity University.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
