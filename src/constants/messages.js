/**
 * ============================================================================
 * File: messages.js
 * Path: src/constants/messages.js
 * ----------------------------------------------------------------------------
 * Description:
 * Centralized application messages used throughout the Rakshak application.
 *
 * Responsibilities:
 * • Validation messages
 * • Authentication messages
 * • Network messages
 * • General messages
 *
 * Notes:
 * • Avoid hardcoded strings throughout the application.
 * • Enables future localization (i18n).
 * • Provides a single source of truth for all application messages.
 * ============================================================================
 */

/**
 * ============================================================================
 * Validation Messages
 * ============================================================================
 */
export const VALIDATION_MESSAGES = {

  // Name
  NAME_REQUIRED:
    "Full name is required.",

  // Email
  EMAIL_REQUIRED:
    "Email is required.",

  INVALID_EMAIL:
    "Please enter a valid email address.",

  // Password
  PASSWORD_REQUIRED:
    "Password is required.",

  PASSWORD_INVALID:
    "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.",

  PASSWORDS_DO_NOT_MATCH:
    "Passwords do not match.",

  // Phone
  PHONE_REQUIRED:
    "Phone number is required.",

  INVALID_PHONE:
    "Please enter a valid 10-digit mobile number.",

  // Blood Group
  BLOOD_GROUP_REQUIRED:
    "Please select your blood group.",

};

/**
 * ============================================================================
 * Authentication Messages
 * ============================================================================
 */
export const AUTH_MESSAGES = {

  LOGIN_SUCCESS:
    "Login successful.",

  LOGIN_FAILED:
    "Invalid email or password.",

  REGISTER_SUCCESS:
    "Registration successful.",

  REGISTER_FAILED:
    "Registration failed. Please try again.",

  LOGOUT_SUCCESS:
    "Logged out successfully.",

  SESSION_EXPIRED:
    "Your session has expired. Please login again.",

};

/**
 * ============================================================================
 * Network Messages
 * ============================================================================
 */
export const NETWORK_MESSAGES = {

  NO_INTERNET:
    "No internet connection. Please check your internet connection and try again.",

  SERVER_ERROR:
    "Something went wrong on the server. Please try again later.",

  REQUEST_TIMEOUT:
    "The request timed out. Please try again.",

};

/**
 * ============================================================================
 * General Messages
 * ============================================================================
 */
export const GENERAL_MESSAGES = {

  LOADING:
    "Loading...",

  PLEASE_WAIT:
    "Please wait...",

  SOMETHING_WENT_WRONG:
    "Something went wrong. Please try again.",

  FEATURE_COMING_SOON:
    "This feature will be available soon.",

};