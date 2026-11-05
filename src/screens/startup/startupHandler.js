/**
 * ============================================================================
 * File: startupHandler.js
 * Path: src/screens/startup/startupHandler.js
 * ----------------------------------------------------------------------------
 * Description:
 * Business logic for restoring the user's authentication session when the
 * application starts.
 *
 * Responsibilities:
 * • Retrieve stored authentication tokens
 * • Refresh access token
 * • Securely save refreshed tokens
 * • Restore Redux authentication state
 * • Return standardized startup result
 *
 * Notes:
 * • No UI
 * • No Navigation
 * • No React State
 * • No Redux Dispatch
 * ============================================================================
 */

// Imports
import {
  getTokens,
  refreshUserToken,
  saveTokens,
  logoutUser,
} from "../auth/Login/loginService";

import { mapAuthResponse } from "../../utils/auth/authMapper";

import {
  createSuccessResponse,
  createErrorResponse,
} from "../../utils";

/**
 * ============================================================================
 * Restore Authentication Session
 * ============================================================================
 *
 * @returns {Promise<Object>}
 */
export const restoreSession = async () => {

  try {

    /**
     * Retrieve stored authentication tokens
     */
    const tokens = await getTokens();

    /**
     * No stored session
     */
    if (!tokens?.refreshToken) {

      return createErrorResponse({
        message: "No active session found.",
      });

    }

    /**
     * Refresh access token
     */
    const response = await refreshUserToken(
      tokens.refreshToken
    );

    /**
     * Save refreshed tokens
     */
    await saveTokens({

      accessToken: response.accessToken,

      refreshToken: response.refreshToken,

    });

    /**
     * Success
     */
    return createSuccessResponse({

      data: mapAuthResponse(response),

    });

  } catch (error) {

    /**
     * Session is no longer valid
     */
    await logoutUser();

    return createErrorResponse({

      message:
        error?.response?.data?.message ||
        "Session expired.",

    });

  }

};