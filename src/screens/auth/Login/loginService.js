/**
 * ============================================================================
 * File: loginService.js
 * Path: src/screens/auth/Login/loginService.js
 * ----------------------------------------------------------------------------
 * Description:
 * Service layer for the Login module.
 *
 * Responsibilities:
 * • Login user
 * • Save authentication tokens securely
 * • Retrieve stored authentication tokens
 * • Delete authentication tokens
 *
 * Notes:
 * • No UI
 * • No Navigation
 * • No Redux
 * • No Validation
 * • Only communicates with the API layer and Secure Storage.
 * ============================================================================
 */

// Imports
import * as Keychain from "react-native-keychain";

import {
  login,
  logout,
  refreshToken,
} from "../../../api";

import {
  STORAGE_KEYS,
} from "../../../constants";

/**
 * ============================================================================
 * Login User
 * ============================================================================
 *
 * @param {Object} credentials
 * @returns {Promise<Object>}
 */
export const loginUser = async (credentials) => {

  const response = await login(credentials);

  return response.data;

};

/**
 * ============================================================================
 * Save Authentication Tokens
 * ============================================================================
 *
 * @param {Object} tokens
 */
export const saveTokens = async ({
  accessToken,
  refreshToken,
}) => {

  await Keychain.setGenericPassword(

    STORAGE_KEYS.ACCESS_TOKEN,

    JSON.stringify({

      accessToken,
      refreshToken,

    }),

    {
      service: STORAGE_KEYS.USER_CREDENTIALS,
    }

  );

};

/**
 * ============================================================================
 * Get Authentication Tokens
 * ============================================================================
 *
 * @returns {Promise<Object|null>}
 */
export const getTokens = async () => {

  const credentials =
    await Keychain.getGenericPassword({

      service: STORAGE_KEYS.USER_CREDENTIALS,

    });

  if (!credentials) {
    return null;
  }

  return JSON.parse(credentials.password);

};

/**
 * ============================================================================
 * Refresh Access Token
 * ============================================================================
 *
 * @param {string} token
 * @returns {Promise<Object>}
 */
export const refreshUserToken = async (token) => {

  const response =
    await refreshToken({
      refreshToken: token,
    });

  return response.data;

};

/**
 * ============================================================================
 * Logout User
 * ============================================================================
 *
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {

  try {

    await logout();

  } finally {

    await Keychain.resetGenericPassword({

      service: STORAGE_KEYS.USER_CREDENTIALS,

    });

  }

};