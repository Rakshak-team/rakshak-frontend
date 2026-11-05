
/**
 * ============================================================================
 * File: endpoints.js
 * Path: src/api/endpoints.js
 * ----------------------------------------------------------------------------
 * Description:
 * Centralized API endpoint definitions for the Rakshak application.
 *
 * Responsibilities:
 * • Store all backend API endpoints
 * • Prevent hardcoded URLs throughout the project
 * • Provide a single source of truth for API routes
 * ============================================================================
 */

/**
 * ============================================================================
 * Authentication Endpoints
 * ============================================================================
 */
export const AUTH_ENDPOINTS = {

  // User Login
  LOGIN: "/auth/login",

  // User Registration
  REGISTER: "/auth/register",

  // Refresh Access Token
  REFRESH_TOKEN: "/auth/refresh-token",

  // Logout User
  LOGOUT: "/auth/logout",

  // Get Logged In User
  ME: "/auth/me",

};

/**
 * ============================================================================
 * User Endpoints
 * ============================================================================
 */
export const USER_ENDPOINTS = {

  // User Profile
  PROFILE: "/users/profile",

  // Update User Profile
  UPDATE_PROFILE: "/users/profile",

  // Upload Profile Picture
  UPLOAD_PROFILE_PHOTO: "/users/profile/photo",

};

/**
 * ============================================================================
 * Incident Endpoints
 * ============================================================================
 */
export const INCIDENT_ENDPOINTS = {

  // Report New Incident
  REPORT: "/incidents",

  // Get All Incidents
  GET_ALL: "/incidents",

  // Get Incidents Reported By Logged In User
  GET_MY: "/incidents/my",

  // Get Incident Details
  GET_BY_ID: "/incidents/:id",

  // Accept Incident
  ACCEPT: "/incidents/:id/accept",

  // Reject Incident
  REJECT: "/incidents/:id/reject",

};

/**
 * ============================================================================
 * Volunteer Endpoints
 * ============================================================================
 */
export const VOLUNTEER_ENDPOINTS = {

  // Nearby Volunteers
  NEARBY: "/volunteers/nearby",

  // Volunteer Status
  STATUS: "/volunteers/status",

};

/**
 * ============================================================================
 * Location Endpoints
 * ============================================================================
 */
export const LOCATION_ENDPOINTS = {

  // Update Current Location
  UPDATE: "/location/update",

  // Get Live Location
  LIVE: "/location/live",

};

/**
 * ============================================================================
 * Notification Endpoints
 * ============================================================================
 */
export const NOTIFICATION_ENDPOINTS = {

  // Register FCM Token
  REGISTER_TOKEN: "/notifications/register-token",

  // Get Notifications
  GET_ALL: "/notifications",

  // Mark Notification as Read
  MARK_READ: "/notifications/:id/read",

};

/**
 * ============================================================================
 * AI / ML Endpoints
 * ============================================================================
 */
export const AI_ENDPOINTS = {

  // Predict Incident Severity
  PREDICT_SEVERITY: "/ai/predict-severity",

};

/**
 * ============================================================================
 * Upload Endpoints
 * ============================================================================
 */
export const UPLOAD_ENDPOINTS = {

  // Upload Incident Image
  INCIDENT_IMAGE: "/api/upload",

};
