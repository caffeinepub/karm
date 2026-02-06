# Landing Page Customization Guide

This guide explains the KARM landing page structure and how to modify the APK download link.

## Overview

The KARM landing page is a minimal, black-themed single-page application with no images or mockups. All configuration is hardcoded in the frontend codebase.

## APK Download Link

The APK download link is fixed and points to a Google Drive file. All download buttons on the landing page use this same link.

**Current link:** `https://drive.google.com/file/d/1hFHZKQIsXB-80s6kiqhzfsKxi3s24qA7/view?usp=drive_link`

### How to Change the Download Link

1. Open `frontend/src/components/landing/download.ts`
2. Update the `APK_DOWNLOAD_URL` constant with your new URL
3. Save the file

Example:
