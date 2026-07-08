/**
 * ============================================================================
 * File: storageKeys.js
 * Path: src/constants/storageKeys.js
 * ----------------------------------------------------------------------------
 * Description:
 * Centralized storage keys used throughout the Rakshak application.
 *
 * Responsibilities:
 * • Secure storage keys (Keychain)
 * • Local storage keys
 * • Prevent hardcoded storage identifiers
 *
 * Notes:
 * • Import these constants instead of hardcoding key names.
 * • Used with react-native-keychain and future storage solutions.
 * ============================================================================
 */

/**
 * ============================================================================
 * Storage Keys
 * ============================================================================
 */
export const STORAGE_KEYS = {

  /**
   * Authentication
   */
  ACCESS_TOKEN: "rakshak_access_token",

  REFRESH_TOKEN: "rakshak_refresh_token",

  USER_CREDENTIALS: "rakshak_user_credentials",

  /**
   * User
   */
  USER_PROFILE: "rakshak_user_profile",

  /**
   * Notifications
   */
  FCM_TOKEN: "rakshak_fcm_token",

  /**
   * Application Settings
   */
  THEME: "rakshak_theme",

  LANGUAGE: "rakshak_language",

  FIRST_LAUNCH: "rakshak_first_launch",

};