/**
 * ============================================================================
 * File: cameraService.js
 * Path: src/services/camera/cameraService.js
 * ----------------------------------------------------------------------------
 * Description:
 * Centralized camera service for the Rakshak application.
 *
 * Responsibilities:
 * • Open the device camera
 * • Capture incident photos
 * • Return captured image information
 * • Handle user cancellation
 * • Handle camera related errors
 *
 * Note:
 * This service assumes camera permission has already been granted.
 * Permission handling is managed by PermissionService.
 * ============================================================================
 */

// Imports
import { launchCamera } from "react-native-image-picker";

// Default camera configuration
const CAMERA_OPTIONS = {
  mediaType: "photo",
  cameraType: "back",
  saveToPhotos: false,
  quality: 0.8,
  includeBase64: false,
};

// Camera Service
const CameraService = {

  // Launch the device camera and return the captured image
  async openCamera() {

    // Open the native camera
    const response = await launchCamera(CAMERA_OPTIONS);

    // User cancelled the camera
    if (response.didCancel) {
      return null;
    }

    // Something went wrong while opening the camera
    if (response.errorCode) {
      throw new Error(
        response.errorMessage || "Failed to capture image."
      );
    }

    // Extract the captured image
    const image = response.assets?.[0];

    // No image was returned
    if (!image) {
      throw new Error("No image was captured.");
    }

    // Return only the fields required by the application
    return {
      uri: image.uri,
      fileName: image.fileName,
      fileSize: image.fileSize,
      type: image.type,
      width: image.width,
      height: image.height,
    };

  },

};

export default CameraService;