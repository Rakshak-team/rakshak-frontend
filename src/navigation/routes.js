
/**
 * ============================================================================
 * File: routes.js
 * Path: src/navigation/routes.js
 * ----------------------------------------------------------------------------
 * Description:
 * Defines all application route names in one place.
 *
 * Responsibilities:
 * • Centralize application route names
 * • Prevent hardcoded navigation strings
 * • Maintain consistent navigation across the application
 * ============================================================================
 */

// ============================================================================
// Application Routes
// ============================================================================

export const ROUTES = {

  // ==========================================================================
  // Startup Routes
  // ==========================================================================

  SPLASH: "Splash",
  PERMISSION: "Permission",
  STARTUP: "Startup",

  // ==========================================================================
  // Authentication Routes
  // ==========================================================================

  AUTH: "Auth",
  WELCOME: "Welcome",
  LOGIN: "Login",
  REGISTER: "Register",

  // ==========================================================================
  // Main Application Routes
  // ==========================================================================

  MAIN_TABS: "MainTabs",
  HOME: "Home",
  INCIDENTS: "Incidents",
  PROFILE: "Profile",
  SETTINGS: "Settings",

  // ==========================================================================
  // Incident Reporting Routes
  // ==========================================================================

  REPORT_INCIDENT: "ReportIncident",
  INCIDENT_DETAILS: "IncidentDetails",

};
