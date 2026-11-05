/**
 * ============================================================================
 * File: store.js
 * Path: src/redux/store.js
 * ----------------------------------------------------------------------------
 * Description:
 * Configures the application's global Redux store.
 *
 * Responsibilities:
 * • Register all Redux slices
 * • Provide a centralized application state
 * • Enable Redux Toolkit configuration
 * • Serve as the single source of truth for application state
 *
 * Registered Slices:
 * • Authentication
 *
 * Future Slices:
 * • User
 * • Location
 * • Incidents
 * • Notifications
 * • Settings
 *
 * Notes:
 * • Uses Redux Toolkit's configureStore()
 * • Middleware is provided automatically
 * • Redux DevTools are enabled in development
 * ============================================================================
 */

// ============================================================================
// Imports
// ============================================================================

import { configureStore } from "@reduxjs/toolkit";

// Authentication
import authReducer from "./auth/authSlice";

// ============================================================================
// Redux Store
// ============================================================================

export const store = configureStore({

  reducer: {

    // Authentication State
    auth: authReducer,

    // Future State
    // user: userReducer,
    // location: locationReducer,
    // incidents: incidentReducer,
    // notifications: notificationReducer,
    // settings: settingsReducer,

  },

});