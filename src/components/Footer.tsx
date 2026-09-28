import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Shield, Loader2 } from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';
import { subscribeNewsletter } from '../lib/newsletter';
import { fireConfetti } from './gallery/ConfettiBurst';
import { Watermark } from './gallery/Watermark';
import { LogoBadge } from './LogoBadge';

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
    <footer id="bulletin" className="relative overflow-hidden bg-white text-xs border-t-2 border-slate-100">
      <Watermark side="left" opacity={0.05} />
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <LogoBadge size="md" />
              <div>
                <div className="font-bold text-base text-[#00387d] tracking-wide uppercase" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  {conferenceInfo.title || 'Trinity International MUN'}
                </div>
                <div className="text-[10px] text-[#b56a00] font-bold uppercase tracking-widest">
                  Knowledge • Exposure • Opportunity
                </div>
              </div>
            </div>

            <p className="text-[#777777] leading-relaxed max-w-sm">
              A hybrid diplomatic simulation, youth development, leadership, and professional empowerment platform equipping youth to shape the future of diplomacy and governance.
            </p>

            <div className="space-y-1.5 text-[13px] text-[#4b4b4b]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#f4a024] shrink-0" />
                <span>Trinity University, Yaba • Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#f4a024] shrink-0" />
                <span>{conferenceInfo.contactEmail || 'secretariat@timun.org'}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#00387d] text-sm uppercase tracking-wider" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Quick Links
            </h4>
            <ul className="space-y-2 text-[#4b4b4b]">
              <li><a href="#overview" className="hover:text-[#f4a024] transition-colors">About TiMUN</a></li>
              <li><a href="#media" className="hover:text-[#f4a024] transition-colors">Stories & Updates</a></li>
              <li><a href="#venue" className="hover:text-[#f4a024] transition-colors">Venue in Yaba, Lagos</a></li>
              <li><a href="#coming-soon" className="hover:text-[#f4a024] transition-colors">More Rooms (Pending)</a></li>
              <li><a href="#faq" className="hover:text-[#f4a024] transition-colors">Questions & Contact</a></li>
            </ul>
          </div>

          {/* Delegate Resources */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#00387d] text-sm uppercase tracking-wider" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Delegate Portal
            </h4>
            <ul className="space-y-2 text-[#4b4b4b]">
              <li>
                <button onClick={onOpenRegister} className="hover:text-[#f4a024] transition-colors text-left cursor-pointer">
                  Apply as Delegate
                </button>
              </li>
              <li>
                <button onClick={onOpenResolutionBuilder} className="hover:text-[#f4a024] transition-colors text-left text-[#f4a024] font-bold cursor-pointer">
                  Resolution Builder Tool
                </button>
              </li>
              <li><a href="#faq" className="hover:text-[#f4a024] transition-colors">Frequently Asked Questions</a></li>
              {onOpenCms && (
                <li className="pt-1">
                  <button
                    onClick={onOpenCms}
                    className="text-[#b56a00] font-semibold hover:text-[#00387d] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>{isExecutive ? 'Executive Secretariat Portal' : 'Executive Secretariat Login'}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#00387d] text-sm uppercase tracking-wider" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Conference Bulletin
            </h4>
            <p className="text-[13px] text-[#777777] leading-relaxed">
              One short email when study guides drop, when countries are assigned,
              and when gala details land. No noise, unsubscribe anytime.
            </p>

            {newsletterState === 'done' ? (
              <div className="p-3 bg-[#dcf3e5] rounded-xl border-2 border-[#54b77e] text-[#35794f] text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#f4a024]" />
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
                  className="duo-input"
                />
                <button
                  type="submit"
                  disabled={newsletterState === 'busy'}
                  className="duo-btn duo-btn-gold w-full"
                >
                  {newsletterState === 'busy' ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Send className="w-3 h-3" />
                  )}
                  <span>{newsletterState === 'busy' ? 'Subscribing…' : 'Subscribe Bulletin'}</span>
                </button>
                {newsletterState === 'duplicate' && (
                  <p className="text-[13px] text-[#f4a024]">This email is already subscribed.</p>
                )}
                {newsletterState === 'invalid' && (
                  <p className="text-[13px] text-[#dd0000]">Please enter a valid email address.</p>
                )}
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t-2 border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#777777]">
          <div>
            © 2027 Trinity International Model United Nations (TiMUN). Independently founded & managed. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#f4a024] shrink-0" />
            <span>In association with Trinity University, Yaba, Lagos.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
