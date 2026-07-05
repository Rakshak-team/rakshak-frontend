/**
 * ============================================================================
 * File: permissionService.js
 * Path: src/services/permissions/permissionService.js
 * ----------------------------------------------------------------------------
 * Description:
 * Centralized permission management service for the Rakshak application.
 *
 * Responsibilities:
 * • Check permission status
 * • Request runtime permissions
 * • Verify required app permissions
 *
 * Supported Permissions:
 * • Camera
 * • Foreground Location
 * • Background Location
 * • Notifications
 *
 * Note:
 * This service ONLY manages permissions.
 * It does NOT access camera, location or notifications directly.
 * ============================================================================
 */

// Imports
import { Platform } from "react-native";
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";

// Permission Service
const PermissionService = {

  // Check camera permission
  async checkCameraPermission() {

    if (Platform.OS !== "android") {
      return RESULTS.UNAVAILABLE;
    }

    return check(PERMISSIONS.ANDROID.CAMERA);

  },

  // Request camera permission
  async requestCameraPermission() {

    if (Platform.OS !== "android") {
      return RESULTS.UNAVAILABLE;
    }

    return request(PERMISSIONS.ANDROID.CAMERA);

  },

  // Check foreground location permission
  async checkLocationPermission() {

    if (Platform.OS !== "android") {
      return RESULTS.UNAVAILABLE;
    }

    return check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

  },

  // Request foreground location permission
  async requestLocationPermission() {

    if (Platform.OS !== "android") {
      return RESULTS.UNAVAILABLE;
    }

    return request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

  },

  // Check background location permission
  async checkBackgroundLocationPermission() {

    if (Platform.OS !== "android") {
      return RESULTS.UNAVAILABLE;
    }

    return check(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);

  },

  // Request background location permission
  async requestBackgroundLocationPermission() {

    if (Platform.OS !== "android") {
      return RESULTS.UNAVAILABLE;
    }

    return request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);

  },

  // Check notification permission
  async checkNotificationPermission() {

    if (Platform.OS !== "android") {
      return RESULTS.UNAVAILABLE;
    }

    return check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

  },

  // Request notification permission
  async requestNotificationPermission() {

    if (Platform.OS !== "android") {
      return RESULTS.UNAVAILABLE;
    }

    return request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

  },

  // Check if all required permissions are already granted
  async hasAllRequiredPermissions() {

    const camera = await this.checkCameraPermission();
    const location = await this.checkLocationPermission();
    const notification = await this.checkNotificationPermission();

    return (
      camera === RESULTS.GRANTED &&
      location === RESULTS.GRANTED &&
      notification === RESULTS.GRANTED
    );

  },

  // Request all mandatory permissions required by the app
  async requestAllPermissions() {

    // Check current camera permission
    let camera = await this.checkCameraPermission();

    // Request camera permission if required
    if (camera !== RESULTS.GRANTED) {
      camera = await this.requestCameraPermission();
    }

    // Check current location permission
    let location = await this.checkLocationPermission();

    // Request location permission if required
    if (location !== RESULTS.GRANTED) {
      location = await this.requestLocationPermission();
    }

    // Check current notification permission
    let notification = await this.checkNotificationPermission();

    // Request notification permission if required
    if (notification !== RESULTS.GRANTED) {
      notification = await this.requestNotificationPermission();
    }

    // Return the final permission status
    return {
      granted:
        camera === RESULTS.GRANTED &&
        location === RESULTS.GRANTED &&
        notification === RESULTS.GRANTED,

      camera,
      location,
      notification,
    };

  },

};

export default PermissionService;