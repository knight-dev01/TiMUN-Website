import React, { useState, useEffect } from 'react';
import { Menu, X, PenTool, ChevronRight } from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';
import { LogoBadge } from './LogoBadge';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenResolutionBuilder: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const NAV_LINKS = [
  { id: 'overview', label: 'ABOUT' },
  { id: 'media', label: 'STORIES' },
  { id: 'venue', label: 'VENUE' },
  { id: 'coming-soon', label: 'MORE' },
  { id: 'faq', label: 'FAQS' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  onOpenResolutionBuilder,
  activeSection,
  setActiveSection
}) => {
  const { conferenceInfo } = useConferenceData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 border-b-2 border-slate-100 ${
      scrolled ? 'shadow-md' : ''
    }`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-[72px]">

        {/* Brand — always visible */}
        <button
          onClick={() => scrollToSection('hero')}
          className="cursor-pointer"
          id="nav-brand-logo"
          aria-label="TiMUN home"
        >
          <LogoBadge size="sm" />
        </button>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              id={`nav-link-${link.id}`}
              className={`px-4 py-2 rounded-xl text-[15px] font-bold tracking-wide transition-colors cursor-pointer ${
                activeSection === link.id
                  ? 'text-[#00387d] bg-[#eef4fa]'
                  : 'text-[#777777] hover:text-[#00387d] hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right actions — executive portal lives in the footer only */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={onOpenRegister}
            id="nav-btn-register-main"
            className="duo-btn duo-btn-red !py-2.5 !px-5"
          >
            Register
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenRegister}
            className="duo-btn duo-btn-red !py-2 !px-4 sm:hidden"
          >
            Register
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-mobile-toggle"
            className="p-2.5 rounded-xl text-[#4b4b4b] border-2 border-slate-200"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t-2 border-slate-100 px-4 py-4 animate-fadeIn">
          <div className="space-y-1 mb-4">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-bold transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#eef4fa] text-[#00387d]'
                    : 'text-[#4b4b4b]'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#afafaf]" />
              </button>
            ))}
          </div>
          <div className="pt-3 border-t-2 border-slate-100 space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenResolutionBuilder(); }}
              className="duo-btn duo-btn-ghost w-full"
            >
              <PenTool className="w-4 h-4" />
              <span>Resolution Desk</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenRegister(); }}
              className="duo-btn duo-btn-red w-full"
            >
              <span>Register for {conferenceInfo.acronym || 'TiMUN 2027'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
