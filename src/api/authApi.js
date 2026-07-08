/**
 * ============================================================================
 * File: authApi.js
 * Path: src/api/authApi.js
 * ----------------------------------------------------------------------------
 * Description:
 * Authentication API layer for the Rakshak application.
 *
 * Responsibilities:
 * • Login user
 * • Register user
 * • Refresh access token
 * • Logout user
 * • Fetch authenticated user
 *
 * Note:
 * This file should only communicate with the backend.
 * No validation, navigation or business logic should exist here.
 * ============================================================================
 */

// Imports
import axiosClient from "./axiosClient";
import { AUTH_ENDPOINTS } from "./endpoints";

/**
 * ============================================================================
 * Login User
 * ============================================================================
 *
 * @param {Object} loginData
 * @returns {Promise}
 */
export const login = (loginData) => {
  return axiosClient.post(
    AUTH_ENDPOINTS.LOGIN,
    loginData
  );
};

/**
 * ============================================================================
 * Register User
 * ============================================================================
 *
 * @param {Object} registerData
 * @returns {Promise}
 */
export const register = (registerData) => {
  return axiosClient.post(
    AUTH_ENDPOINTS.REGISTER,
    registerData
  );
};

/**
 * ============================================================================
 * Refresh Access Token
 * ============================================================================
 *
 * @param {Object} refreshTokenData
 * @returns {Promise}
 */
export const refreshToken = (refreshTokenData) => {
  return axiosClient.post(
    AUTH_ENDPOINTS.REFRESH_TOKEN,
    refreshTokenData
  );
};

/**
 * ============================================================================
 * Logout User
 * ============================================================================
 *
 * @returns {Promise}
 */
export const logout = () => {
  return axiosClient.post(
    AUTH_ENDPOINTS.LOGOUT
  );
};

/**
 * ============================================================================
 * Get Logged In User
 * ============================================================================
 *
 * @returns {Promise}
 */
export const getCurrentUser = () => {
  return axiosClient.get(
    AUTH_ENDPOINTS.ME
  );
};