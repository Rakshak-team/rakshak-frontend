/**
 * ============================================================================
 * File: response.js
 * Path: src/utils/response.js
 * ----------------------------------------------------------------------------
 * Description:
 * Standard response helper used throughout the Rakshak application.
 *
 * Responsibilities:
 * • Create consistent success responses
 * • Create consistent error responses
 * • Eliminate duplicate response objects
 *
 * Notes:
 * • Use these helpers instead of manually creating response objects.
 * • Keeps business logic clean and consistent.
 * ============================================================================
 */

/**
 * ============================================================================
 * Create Success Response
 * ============================================================================
 *
 * @param {Object} options
 * @returns {Object}
 */
export const createSuccessResponse = ({
  message = "",
  data = null,
}) => {

  return {
    success: true,
    message,
    data,
    errors: {},
  };

};

/**
 * ============================================================================
 * Create Error Response
 * ============================================================================
 *
 * @param {Object} options
 * @returns {Object}
 */
export const createErrorResponse = ({
  message = "",
  errors = {},
}) => {

  return {
    success: false,
    message,
    data: null,
    errors,
  };

};