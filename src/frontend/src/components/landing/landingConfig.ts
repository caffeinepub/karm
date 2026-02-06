/**
 * Centralized Landing Page Configuration
 * 
 * The APK download link is fixed and points to Google Drive.
 * To change it, edit the APK_DOWNLOAD_URL constant in frontend/src/components/landing/download.ts
 */

import { APK_DOWNLOAD_URL } from './download';

export const LANDING_CONFIG = {
  /**
   * Download Configuration
   * Fixed Google Drive URL for APK download
   */
  download: {
    apkUrl: APK_DOWNLOAD_URL,
  },

  /**
   * Hero Section Configuration
   */
  hero: {
    // Primary CTA action: opens the fixed Google Drive link
    primaryCTA: {
      action: 'download' as const,
    },
    // Secondary CTA action: scroll to a section
    secondaryCTA: {
      action: 'scroll' as const,
      scrollTarget: 'what-it-does',
    },
  },
};

/**
 * Type definitions for configuration
 */
export type SecondaryCTAAction = 'scroll';
export type PrimaryCTAAction = 'download';
