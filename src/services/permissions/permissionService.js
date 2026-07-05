/**
 * ============================================================================
 * File: permissionService.js
 * Path: src/services/permission/permissionService.js
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

import { Platform } from "react-native";

import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";

/**
 * Permission Service
 *
 * Provides a single interface for checking and requesting
 * all runtime permissions used inside Rakshak.
 */
const PermissionService = {

  /**
   * Check Camera Permission
   *
   * Returns:
   * RESULTS.GRANTED
   * RESULTS.DENIED
   * RESULTS.BLOCKED
   * RESULTS.UNAVAILABLE
   */
  async checkCameraPermission() {

    if (Platform.OS !== "android") {
      return RESULTS.UNAVAILABLE;
    }

    return check(
      PERMISSIONS.ANDROID.CAMERA
    );
  },

  /**
   * Request Camera Permission
   */
  async requestCameraPermission() {

    if (Platform.OS !== "android") {
      return RESULTS.UNAVAILABLE;
    }

    return request(
      PERMISSIONS.ANDROID.CAMERA
    );
  },

  /**
   * Check Foreground Location Permission
   */
  async checkLocationPermission() {

    if (Platform.OS !== "android") {
      return RESULTS.UNAVAILABLE;
    }

    return check(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );
  },

  /**
   * Request Foreground Location Permission
   */
  async requestLocationPermission() {

    if (Platform.OS !== "android") {
      return RESULTS.UNAVAILABLE;
    }

    return request(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );
  },

  /**
   * Check Background Location Permission
   */
  async checkBackgroundLocationPermission() {

    if (Platform.OS !== "android") {
      return RESULTS.UNAVAILABLE;
    }

    return check(
      PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
    );
  },

  /**
   * Request Background Location Permission
   */
  async requestBackgroundLocationPermission() {

    if (Platform.OS !== "android") {
      return RESULTS.UNAVAILABLE;
    }

    return request(
      PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
    );
  },

  /**
   * Check Notification Permission
   */
  async checkNotificationPermission() {

    if (Platform.OS !== "android") {
      return RESULTS.UNAVAILABLE;
    }

    return check(
      PERMISSIONS.ANDROID.POST_NOTIFICATIONS
    );
  },

  /**
   * Request Notification Permission
   */
  async requestNotificationPermission() {

    if (Platform.OS !== "android") {
      return RESULTS.UNAVAILABLE;
    }

    return request(
      PERMISSIONS.ANDROID.POST_NOTIFICATIONS
    );
  },

  /**
   * Check whether all mandatory
   * permissions are granted.
   *
   * Returns:
   * true  -> All permissions granted
   * false -> One or more permissions missing
   */
  async hasAllRequiredPermissions() {

    const camera =
      await this.checkCameraPermission();

    const location =
      await this.checkLocationPermission();

    const notification =
      await this.checkNotificationPermission();

    return (

      camera === RESULTS.GRANTED &&

      location === RESULTS.GRANTED &&

      notification === RESULTS.GRANTED

    );

  },

};

export default PermissionService;