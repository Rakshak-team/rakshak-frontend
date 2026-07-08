/**
 * ============================================================================
 * File: loginHandlers.js
 * Path: src/screens/auth/Login/loginHandlers.js
 * ----------------------------------------------------------------------------
 * Description:
 * Business logic for the Login module.
 *
 * Responsibilities:
 * • Validate login form
 * • Authenticate user
 * • Securely store authentication tokens
 * • Return standardized responses
 *
 * Notes:
 * • No UI
 * • No Navigation
 * • No React State
 * • No Styles
 * ============================================================================
 */

// Imports
import {
  AUTH_MESSAGES,
} from "../../../constants";

import {
  validateLoginForm,
} from "./loginValidation";

import {
  loginUser,
  saveTokens,
} from "./loginService";

import {
  createSuccessResponse,
  createErrorResponse,
} from "../../../utils";

/**
 * ============================================================================
 * Handle Login
 * ============================================================================
 *
 * @param {Object} credentials
 * @returns {Promise<Object>}
 */
export const handleLogin = async ({
  email,
  password,
}) => {

  /**
   * Validate Form
   */
  const validation = validateLoginForm({
    email,
    password,
  });

  if (!validation.isValid) {

    return createErrorResponse({
      errors: validation.errors,
    });

  }

  try {

    /**
     * Login API
     */
    const response = await loginUser({

      email: email.trim(),

      password,

    });

    /**
     * Securely Save Tokens
     */
    await saveTokens({

      accessToken: response.accessToken,

      refreshToken: response.refreshToken,

    });

    /**
     * Success Response
     */
    return createSuccessResponse({

      message: AUTH_MESSAGES.LOGIN_SUCCESS,

      data: response,

    });

  } catch (error) {

    return createErrorResponse({

      message:
        error?.response?.data?.message ||
        AUTH_MESSAGES.LOGIN_FAILED,

    });

  }

};

/**
 * ============================================================================
 * Forgot Password
 * ============================================================================
 */
export const handleForgotPassword = () => {

  return createErrorResponse({

    message:
      "Forgot password feature will be available soon.",

  });

};