/**
 * ============================================================================
 * File: registerService.js
 * Path: src/screens/auth/Register/registerService.js
 * ----------------------------------------------------------------------------
 * Description:
 * Service layer for the Register module.
 *
 * Responsibilities:
 * • Register a new user
 *
 * Notes:
 * • No UI
 * • No Navigation
 * • No Redux
 * • No Validation
 * • Only communicates with the API layer.
 * ============================================================================
 */

// Imports
import {
  register,
} from "../../../api";

/**
 * ============================================================================
 * Register User
 * ============================================================================
 *
 * @param {Object} userData
 * @returns {Promise<Object>}
 */
export const registerUser = async (userData) => {

  const response = await register(userData);

  return response.data;

};