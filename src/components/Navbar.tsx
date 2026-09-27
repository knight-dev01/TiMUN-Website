import React, { useState, useEffect } from 'react';
import {
  Building2,
  Calendar,
  HelpCircle,
  MapPin,
  Menu,
  Users,
  X,
  Award,
  ChevronRight,
  PenTool,
  Lock,
  ShieldCheck,
  Newspaper
} from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenResolutionBuilder: () => void;
  onOpenCms?: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  onOpenResolutionBuilder,
  onOpenCms,
  activeSection,
  setActiveSection
}) => {
  const { conferenceInfo, isExecutive, executiveUser } = useConferenceData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'overview', label: 'About', icon: Building2 },
    { id: 'committees', label: 'Committees', icon: Users },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'toolkit', label: 'Toolkit', icon: PenTool },
    { id: 'secretariat', label: 'Secretariat', icon: Award },
    { id: 'venue', label: 'Venue', icon: MapPin },
    { id: 'media', label: 'Media', icon: Newspaper },
    { id: 'faq', label: 'FAQs', icon: HelpCircle },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-2.5 shadow-xs' 
        : 'bg-white border-b border-slate-200 py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand */}
        <button 
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          id="nav-brand-logo"
        >
          <img 
            src="/logo.png" 
            alt="TiMUN Official Logo" 
            className="h-9 w-auto max-w-[140px] object-contain shrink-0" 
            onError={(e) => {
              // Fallback to text badge if image fails
              const target = e.currentTarget;
              target.style.display = 'none';
              const fallback = document.getElementById('nav-logo-fallback');
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div id="nav-logo-fallback" className="hidden w-8 h-8 bg-blue-900 rounded items-center justify-center text-amber-400 font-serif text-base font-bold italic shrink-0">
            T
          </div>
          <div className="leading-tight hidden sm:block">
            <span className="text-sm font-bold tracking-tight text-blue-900 font-serif block">
              {conferenceInfo.acronym || 'TiMUN 2027'}
            </span>
            <span className="text-[10px] text-slate-500 font-medium block">
              Youth Diplomacy & Leadership
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                id={`nav-link-${link.id}`}
                className={`transition-colors cursor-pointer relative py-1 ${
                  isActive 
                    ? 'text-blue-900 font-bold' 
                    : 'hover:text-blue-900'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Resolution Builder link */}
          <button
            onClick={onOpenResolutionBuilder}
            id="nav-btn-resolution-builder"
            className="text-xs font-medium text-slate-600 hover:text-blue-900 flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-slate-100 transition-colors cursor-pointer"
            title="Draft UN Resolution clauses"
          >
            <PenTool className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden xl:inline">Resolution Builder</span>
          </button>

          {/* Executive Portal Button */}
          {onOpenCms && (
            <button
              onClick={onOpenCms}
              className={`text-xs font-medium flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-colors cursor-pointer ${
                isExecutive
                  ? 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 font-semibold'
                  : 'text-slate-600 hover:text-blue-900 hover:bg-slate-100'
              }`}
              title={isExecutive ? `Executive Portal (${executiveUser?.name || 'Logged In'})` : 'Executive Login'}
            >
              {isExecutive ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Exec Portal</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Exec Login</span>
                </>
              )}
            </button>
          )}

          {/* Main CTA */}
          <button
            onClick={onOpenRegister}
            id="nav-btn-register-main"
            className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded text-xs font-semibold tracking-wide transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>Register</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenRegister}
            className="sm:hidden px-3 py-1.5 rounded text-xs font-semibold text-white bg-blue-900"
          >
            Register
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-mobile-toggle"
            className="p-2 rounded text-slate-700 hover:text-blue-900 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-5 shadow-lg animate-fadeIn">
          <div className="space-y-1 mb-5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-semibold transition-colors ${
                    activeSection === link.id
                      ? 'bg-blue-50 text-blue-900 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {onOpenCms && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCms();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                {isExecutive ? <ShieldCheck className="w-4 h-4 text-amber-700" /> : <Lock className="w-4 h-4 text-slate-500" />}
                <span>{isExecutive ? 'Executive Portal' : 'Executive Login'}</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResolutionBuilder();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200"
            >
              <PenTool className="w-4 h-4 text-amber-600" />
              <span>Resolution Builder</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded text-xs font-semibold text-white bg-blue-900"
            >
              <span>Register for {conferenceInfo.acronym || 'TiMUN 2027'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


