/**
 * Fixed APK download link
 * This link is hardcoded and points to the Mega APK file
 */
export const APK_DOWNLOAD_URL = 'https://mega.nz/file/mNUmCL7D#8S_NdNQ4MJe-3tprEFLy3UPBq6QJoVT3D5TNfo7gCLw';

/**
 * Shared APK download handler for all CTAs
 * Opens the fixed Mega link in a new tab
 */
export function downloadAPK() {
  window.open(APK_DOWNLOAD_URL, '_blank', 'noopener,noreferrer');
}
