import React, { useEffect } from 'react';
import { SiteManagementPortalModal } from './SiteManagementPortalModal';
import { trackPageView } from '../lib/analytics';

interface AdminPageProps {
  onExit: () => void;
}

/**
 * Executive portal as its own page (#/admin route).
 * Same manager, full-screen, in the site's light design language.
 */
export const AdminPage: React.FC<AdminPageProps> = ({ onExit }) => {
  useEffect(() => {
    trackPageView('admin');
    const prev = document.title;
    document.title = 'Executive Portal — TiMUN 2027';
    return () => {
      document.title = prev;
    };
  }, []);

  return <SiteManagementPortalModal isOpen layout="page" onClose={onExit} />;
};
