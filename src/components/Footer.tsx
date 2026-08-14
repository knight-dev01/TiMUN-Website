import React, { useState } from 'react';
import { Globe, Mail, Phone, MapPin, Send, CheckCircle2, Shield, Heart } from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';

interface FooterProps {
  onOpenRegister: () => void;
  onOpenResolutionBuilder: () => void;
  onOpenCms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRegister, onOpenResolutionBuilder, onOpenCms }) => {
  const { conferenceInfo, isExecutive } = useConferenceData();
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-blue-950 text-slate-300 text-xs border-t border-blue-900">
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
                <div className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                  Knowledge • Exposure • Opportunity
                </div>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed max-w-sm">
              A hybrid diplomatic simulation, youth development, leadership, and professional empowerment platform equipping youth to shape the future of diplomacy and governance.
            </p>

            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Trinity University • Associate Institution</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
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
              <li><a href="#overview" className="hover:text-amber-400 transition-colors">About Conference</a></li>
              <li><a href="#committees" className="hover:text-amber-400 transition-colors">Committees & Topics</a></li>
              <li><a href="#schedule" className="hover:text-amber-400 transition-colors">3-Day Itinerary</a></li>
              <li><a href="#secretariat" className="hover:text-amber-400 transition-colors">Secretariat Board</a></li>
              <li><a href="#venue" className="hover:text-amber-400 transition-colors">Campus Venue & Hotel</a></li>
            </ul>
          </div>

          {/* Delegate Resources */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider">
              Delegate Portal
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={onOpenRegister} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  Apply as Delegate
                </button>
              </li>
              <li>
                <button onClick={onOpenResolutionBuilder} className="hover:text-amber-400 transition-colors text-left text-amber-300 font-bold cursor-pointer">
                  Resolution Builder Tool
                </button>
              </li>
              <li><a href="#toolkit" className="hover:text-amber-400 transition-colors">Rules of Procedure (ROP)</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">Frequently Asked Questions</a></li>
              {onOpenCms && (
                <li className="pt-1">
                  <button
                    onClick={onOpenCms}
                    className="text-amber-400 font-semibold hover:text-amber-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
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
              Subscribe to receive study guide releases, country allocation notices, and gala updates.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="delegate@email.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-blue-900/60 border border-blue-800 rounded px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded font-bold uppercase tracking-wider text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                >
                  <Send className="w-3 h-3 text-slate-950" />
                  <span>Subscribe Bulletin</span>
                </button>
              </form>
            ) : (
              <div className="p-3 bg-blue-900/80 rounded border border-amber-400/40 text-amber-300 text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Subscribed successfully!</span>
              </div>
            )}
          </div>

        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © 2027 Trinity International Model United Nations (TiMUN). Independently founded & managed. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>TiMUN is an independent diplomatic simulation and youth empowerment platform in association with Trinity University.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
