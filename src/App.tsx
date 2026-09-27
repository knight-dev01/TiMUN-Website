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
import { CommitteesSection } from './components/CommitteesSection';
import { DelegateToolkit } from './components/DelegateToolkit';
import { ScheduleSection } from './components/ScheduleSection';
import { SecretariatSection } from './components/SecretariatSection';
import { VenueSection } from './components/VenueSection';
import { MediaSection } from './components/MediaSection';
import { FaqContactSection } from './components/FaqContactSection';
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
    setActiveSection('committees');
    const element = document.getElementById('committees');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-amber-200 selection:text-slate-900">
      <SEO />

      {/* Top Fixed Header Navbar */}
      <Navbar
        onOpenRegister={() => handleOpenRegisterWithChoice('', '')}
        onOpenResolutionBuilder={() => setResolutionBuilderOpen(true)}
        onOpenCms={() => setCmsModalOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Banner */}
        <Hero
          onOpenRegister={() => handleOpenRegisterWithChoice('', '')}
          onExploreCommittees={handleExploreCommittees}
          onOpenResolutionBuilder={() => setResolutionBuilderOpen(true)}
        />

        {/* Institutional Welcome & SG Letter */}
        <WelcomeSection
          onOpenRegister={() => handleOpenRegisterWithChoice('', '')}
        />

        {/* Committees & Topics + Country Matrix */}
        <CommitteesSection
          onOpenRegisterWithChoice={handleOpenRegisterWithChoice}
        />

        {/* 3-Day Schedule Itinerary */}
        <ScheduleSection />

        {/* Delegate Toolkit & ROP & Resolution Helper */}
        <DelegateToolkit
          onOpenResolutionBuilder={() => setResolutionBuilderOpen(true)}
        />

        {/* Secretariat Board */}
        <SecretariatSection onOpenCms={() => setCmsModalOpen(true)} />

        {/* Venue, Campus Map & Hotels */}
        <VenueSection />

        {/* Insights & Media — articles, updates, videos, photo stories */}
        <MediaSection />

        {/* FAQ & Secretariat Support */}
        <FaqContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenRegister={() => handleOpenRegisterWithChoice('', '')}
        onOpenResolutionBuilder={() => setResolutionBuilderOpen(true)}
        onOpenCms={() => setCmsModalOpen(true)}
      />

      {/* Interactive Registration Modal */}
      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        initialCommittee={initialCommittee}
        initialCountry={initialCountry}
      />

      {/* UN Draft Resolution Builder Modal */}
      <ResolutionBuilderModal
        isOpen={resolutionBuilderOpen}
        onClose={() => setResolutionBuilderOpen(false)}
      />

      {/* Site Data Upload & Population Manager Modal */}
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

