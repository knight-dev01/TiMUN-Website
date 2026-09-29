import React, { useEffect } from 'react';
import { useConferenceData } from '../context/ConferenceContext';
import { applySeo, injectJsonLd, conferenceJsonLd } from '../lib/seo';

/** Keeps <head> tags + JSON-LD in sync with live conference data. */
export const SEO: React.FC = () => {
  const { conferenceInfo } = useConferenceData();

  useEffect(() => {
    applySeo({
      title: `${conferenceInfo.acronym || 'TiMUN 2027'} | ${conferenceInfo.title || 'Trinity International Model United Nations'} — ${conferenceInfo.dates || '2027'}`,
      description: `${conferenceInfo.acronym || 'TiMUN 2027'}: ${conferenceInfo.theme || 'youth diplomacy & leadership conference'}. ${conferenceInfo.dates || ''} • ${conferenceInfo.location || ''}. Committees, registration, schedule, study guides and resolution builder.`,
      path: '/',
    });
    injectJsonLd(
      'timun-conference',
      conferenceJsonLd({
        name: `${conferenceInfo.acronym || 'TiMUN 2027'} — ${conferenceInfo.title || ''}`,
        startDate: '2027',
        endDate: '2027',
        locationName: conferenceInfo.location || 'Trinity University, Yaba, Lagos',
        description: conferenceInfo.theme || '',
      })
    );
  }, [conferenceInfo]);

  return null;
};
