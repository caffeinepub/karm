/**
 * Fixed APK download link
 * This link is hardcoded and points to the Google Drive APK file
 */
export const APK_DOWNLOAD_URL = 'https://drive.google.com/file/d/1hFHZKQIsXB-80s6kiqhzfsKxi3s24qA7/view?usp=drive_link';

/**
 * Shared APK download handler for all CTAs
 * Opens the fixed Google Drive link in a new tab
 */
export function downloadAPK() {
  window.open(APK_DOWNLOAD_URL, '_blank', 'noopener,noreferrer');
}
