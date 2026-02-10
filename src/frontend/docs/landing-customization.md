# Landing Page Customization Guide

This guide explains the KARM landing page structure and how to modify the APK download link.

## Overview

The KARM landing page is a minimal, black-themed single-page application with no images or mockups. All configuration is hardcoded in the frontend codebase.

## APK Download Link

The APK download link is fixed and points to a Mega file. All download buttons on the landing page use this same link.

**Current link:** `https://mega.nz/file/mNUmCL7D#8S_NdNQ4MJe-3tprEFLy3UPBq6QJoVT3D5TNfo7gCLw`

### How to Change the Download Link

1. Open `frontend/src/components/landing/download.ts`
2. Update the `APK_DOWNLOAD_URL` constant with your new URL
3. Save the file

Example:

