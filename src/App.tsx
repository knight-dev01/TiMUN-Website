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
import { VerdictCta } from './components/gallery/VerdictCta';
import { PersistentBackdrop } from './components/gallery/PersistentBackdrop';
import { Reveal } from './components/gallery/Reveal';
import { Footer } from './components/Footer';
import { ResolutionBuilderModal } from './components/ResolutionBuilderModal';
import { SiteManagementPortalModal } from './components/SiteManagementPortalModal';

// NOTE: Registration is parked until required. RegistrationModal.tsx stays
// in the repo untouched — re-add its import, state and buttons to relaunch.

function AppContent() {
  const [activeSection, setActiveSection] = useState('hero');
  const [resolutionBuilderOpen, setResolutionBuilderOpen] = useState(false);
  const [cmsModalOpen, setCmsModalOpen] = useState(false);

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
  }, []);

  useEffect(() => {
    if (resolutionBuilderOpen) trackEvent('resolution_builder_opened');
  }, [resolutionBuilderOpen]);

  useEffect(() => {
    if (cmsModalOpen) trackEvent('executive_portal_opened');
  }, [cmsModalOpen]);

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
        <Hero
          onJoinBulletin={goBulletin}
          onExploreCommittees={handleExploreCommittees}
          onOpenResolutionBuilder={() => setResolutionBuilderOpen(true)}
        />

        <Reveal>
          <WelcomeSection onJoinBulletin={goBulletin} />
        </Reveal>

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
        onOpenCms={() => setCmsModalOpen(true)}
      />

      <ResolutionBuilderModal
        isOpen={resolutionBuilderOpen}
        onClose={() => setResolutionBuilderOpen(false)}
      />

      <SiteManagementPortalModal
        isOpen={cmsModalOpen}
        onClose={() => setCmsModalOpen(false)}
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
