/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ConferenceDataProvider } from './context/ConferenceContext';
import { SEO } from './components/SEO';
import { trackPageView, trackEvent } from './lib/analytics';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WelcomeSection } from './components/WelcomeSection';
import { VenueSection } from './components/VenueSection';
import { MediaSection } from './components/MediaSection';
import { FaqContactSection } from './components/FaqContactSection';
import { ComingSoon } from './components/ComingSoon';
import { NationsGrid } from './components/NationsGrid';
import { NewsWire } from './components/NewsWire';
import { VerdictCta } from './components/gallery/VerdictCta';
import { PersistentBackdrop } from './components/gallery/PersistentBackdrop';
import { Reveal } from './components/gallery/Reveal';
import { Footer } from './components/Footer';
import { ResolutionBuilderModal } from './components/ResolutionBuilderModal';
import { AdminPage } from './components/AdminPage';

// NOTE: Registration is parked until required. RegistrationModal.tsx stays
// in the repo untouched — re-add its import, state and buttons to relaunch.

function AppContent() {
  const [activeSection, setActiveSection] = useState('hero');
  const [resolutionBuilderOpen, setResolutionBuilderOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(
    () => typeof window !== 'undefined' && window.location.hash.startsWith('#/admin')
  );

  const openAdmin = () => {
    window.location.hash = '#/admin';
  };

  const exitAdmin = () => {
    window.location.hash = '#';
    setActiveSection('hero');
  };

  const goBulletin = () => {
    setActiveSection('bulletin');
    document.getElementById('bulletin')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreCommittees = () => {
    setActiveSection('coming-soon');
    document.getElementById('coming-soon')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    trackPageView('landing');
    const onHash = () => setIsAdmin(window.location.hash.startsWith('#/admin'));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (resolutionBuilderOpen) trackEvent('resolution_builder_opened');
  }, [resolutionBuilderOpen]);

  useEffect(() => {
    if (isAdmin) trackEvent('executive_portal_opened');
  }, [isAdmin]);

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-white font-sans antialiased" style={{ color: '#4b4b4b' }}>
        <SEO />
        <AdminPage onExit={exitAdmin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans antialiased selection:bg-[#f4a024] selection:text-[#15305b]" style={{ color: '#4b4b4b' }}>
      <SEO />
      <PersistentBackdrop />

      <Navbar
        onJoinBulletin={goBulletin}
        onOpenResolutionBuilder={() => setResolutionBuilderOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Core site: About leads, everything else pending.
          Hidden sections (committees, schedule, toolkit, secretariat)
          remain in the repo and return by re-adding them here. */}
      <main>
        <div className="pt-[72px]">
          <NewsWire />
        </div>

        <Hero
          onJoinBulletin={goBulletin}
          onExploreCommittees={handleExploreCommittees}
          onOpenResolutionBuilder={() => setResolutionBuilderOpen(true)}
        />

        <Reveal>
          <NationsGrid />
        </Reveal>

        <NewsWire />

        <Reveal>
          <NationsGrid />
        </Reveal>

        <Reveal>
          <MediaSection />
        </Reveal>

        <Reveal>
          <VenueSection />
        </Reveal>

        <ComingSoon />

        <FaqContactSection />
        <VerdictCta onJoinBulletin={goBulletin} />
      </main>

      <Footer
        onOpenResolutionBuilder={() => setResolutionBuilderOpen(true)}
        onOpenCms={openAdmin}
      />

      <ResolutionBuilderModal
        isOpen={resolutionBuilderOpen}
        onClose={() => setResolutionBuilderOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ConferenceDataProvider>
      <AppContent />
    </ConferenceDataProvider>
  );
}
