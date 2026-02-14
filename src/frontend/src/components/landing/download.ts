/**
 * Fixed APK download link
 * This link points to the Expo artifact APK file
 */
export const APK_DOWNLOAD_URL = 'https://expo.dev/artifacts/eas/mnS2rupKHoWV5Fa1RQ3uZ.apk';

/**
 * Shared APK download handler for all CTAs
 * Opens the fixed Expo artifact link in a new tab
 */
export function downloadAPK() {
  window.open(APK_DOWNLOAD_URL, '_blank', 'noopener,noreferrer');
}
