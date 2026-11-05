/**
 * ============================================================================
 * File: authSlice.js
 * Path: src/redux/auth/authSlice.js
 * ----------------------------------------------------------------------------
 * Description:
 * Redux slice for authentication state management.
 *
 * Responsibilities:
 * • Store authentication status
 * • Store logged-in user information
 * • Store JWT access and refresh tokens
 * • Update access token after refresh
 * • Clear authentication data on logout
 *
 * Notes:
 * • No API calls
 * • No UI logic
 * • No Secure Storage
 * • Only manages authentication state
 * ============================================================================
 */

// Imports
import { createSlice } from "@reduxjs/toolkit";

// ============================================================================
// Initial State
// ============================================================================

const initialState = {

  // Indicates whether the user is authenticated
  isAuthenticated: false,

  // Logged-in user information
  user: null,

  // JWT Access Token
  accessToken: null,

  // Refresh Token
  refreshToken: null,

};

// ============================================================================
// Authentication Slice
// ============================================================================

const authSlice = createSlice({

  // Slice Name
  name: "auth",

  // Initial State
  initialState,

  // ==========================================================================
  // Reducers
  // ==========================================================================

  reducers: {

    /**
     * ==========================================================================
     * Login Success
     * ==========================================================================
     *
     * Stores authenticated user information and tokens.
     */
    loginSuccess: (state, action) => {

      state.isAuthenticated = true;

      state.user = action.payload.user;

      state.accessToken = action.payload.accessToken;

      state.refreshToken = action.payload.refreshToken;

    },

    /**
     * ==========================================================================
     * Update Access Token
     * ==========================================================================
     *
     * Updates the access token after a successful refresh.
     */
    updateAccessToken: (state, action) => {

      state.accessToken = action.payload;

    },

    /**
     * ==========================================================================
     * Logout
     * ==========================================================================
     *
     * Clears all authentication information.
     */
    logout: (state) => {

      state.isAuthenticated = false;

      state.user = null;

      state.accessToken = null;

      state.refreshToken = null;

    },

  },

});

// ============================================================================
// Exports
// ============================================================================

export const {

  loginSuccess,

  updateAccessToken,

  logout,

} = authSlice.actions;

export default authSlice.reducer;