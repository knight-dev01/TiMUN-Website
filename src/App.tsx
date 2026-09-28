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
import { VerdictCta } from './components/gallery/VerdictCta';
import { FlagMarquee } from './components/gallery/FlagMarquee';
import { PersistentBackdrop } from './components/gallery/PersistentBackdrop';
import { BackToTop } from './components/gallery/BackToTop';
import { Watermark } from './components/gallery/Watermark';
import { Reveal } from './components/gallery/Reveal';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { ResolutionBuilderModal } from './components/ResolutionBuilderModal';
import { SiteManagementPortalModal } from './components/SiteManagementPortalModal';

function AppContent() {
  const [activeSection, setActiveSection] = useState('hero');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [resolutionBuilderOpen, setResolutionBuilderOpen] = useState(false);
  const [cmsModalOpen, setCmsModalOpen] = useState(false);

  const [initialCommittee, setInitialCommittee] = useState('');
  const [initialCountry, setInitialCountry] = useState('');

  const handleOpenRegisterWithChoice = (committeeAcronym: string, countryName: string) => {
    setInitialCommittee(committeeAcronym);
    setInitialCountry(countryName);
    setRegisterModalOpen(true);
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
        onOpenRegister={() => handleOpenRegisterWithChoice('', '')}
        onOpenResolutionBuilder={() => setResolutionBuilderOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Core site: About leads, everything else pending.
          Hidden sections (committees, schedule, toolkit, secretariat)
          remain in the repo and return by re-adding them here. */}
      <main>
        <Hero
          onOpenRegister={() => handleOpenRegisterWithChoice('', '')}
          onExploreCommittees={handleExploreCommittees}
          onOpenResolutionBuilder={() => setResolutionBuilderOpen(true)}
        />

        {/* Assembly of nations — member-state flags */}
        <FlagMarquee />

        <Reveal>
          <div className="relative">
            <Watermark side="right" />
            <WelcomeSection onOpenRegister={() => handleOpenRegisterWithChoice('', '')} />
          </div>
        </Reveal>

        <Reveal>
          <div className="relative">
            <Watermark side="left" />
            <MediaSection />
          </div>
        </Reveal>

        <Reveal>
          <div className="relative">
            <Watermark side="right" />
            <VenueSection />
          </div>
        </Reveal>

        <ComingSoon />

        <div className="relative">
          <Watermark side="left" />
          <FaqContactSection />
          <VerdictCta onOpenRegister={() => handleOpenRegisterWithChoice('', '')} />
        </div>
      </main>

      <BackToTop />

      <Footer
        onOpenRegister={() => handleOpenRegisterWithChoice('', '')}
        onOpenResolutionBuilder={() => setResolutionBuilderOpen(true)}
        onOpenCms={() => setCmsModalOpen(true)}
      />

      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        initialCommittee={initialCommittee}
        initialCountry={initialCountry}
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
