/**
 * ============================================================================
 * File: cameraService.js
 * Path: src/services/camera/cameraService.js
 * ----------------------------------------------------------------------------
 * Description:
 * Centralized camera service for the Rakshak application.
 *
 * Responsibilities:
 * • Open device camera
 * • Capture incident photos
 * • Open device gallery
 * • Return selected media
 * • Handle user cancellation
 * • Handle camera related errors
 *
 * Note:
 * This service assumes camera permission has already been granted.
 * Permission handling is managed by PermissionService.
 * ============================================================================
 */

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

/**
 * Default Camera Configuration
 */
const CAMERA_OPTIONS = {
  mediaType: 'photo',
  cameraType: 'back',
  saveToPhotos: false,
  quality: 0.8,
  includeBase64: false,
};

/**
 * Default Gallery Configuration
 */
const GALLERY_OPTIONS = {
  mediaType: 'photo',
  selectionLimit: 1,
  quality: 0.8,
  includeBase64: false,
};

/**
 * Camera Service
 */
const CameraService = {

  /**
   * Opens the device camera.
   *
   * Returns:
   * • Captured image object
   * • null if cancelled
   */
  async openCamera() {

    const response = await launchCamera(CAMERA_OPTIONS);

    if (response.didCancel) {
      return null;
    }

    if (response.errorCode) {
      throw new Error(response.errorMessage);
    }

    return response.assets?.[0] ?? null;

  },

  /**
   * Opens the device gallery.
   *
   * Returns:
   * • Selected image object
   * • null if cancelled
   */
  async openGallery() {

    const response = await launchImageLibrary(GALLERY_OPTIONS);

    if (response.didCancel) {
      return null;
    }

    if (response.errorCode) {
      throw new Error(response.errorMessage);
    }

    return response.assets?.[0] ?? null;

  },

};

export default CameraService;