/**
 * ============================================================================
 * File: loginValidation.js
 * Path: src/screens/auth/Login/loginValidation.js
 * ----------------------------------------------------------------------------
 * Description:
 * Validation utility for the Login module.
 *
 * Responsibilities:
 * • Validate email
 * • Validate password
 * • Validate complete login form
 *
 * Notes:
 * • Contains only validation logic.
 * • No UI, API, Redux, Navigation or Business Logic.
 * ============================================================================
 */

// Imports
import {
  REGEX,
  VALIDATION_MESSAGES,
} from "../../../constants";

/**
 * ============================================================================
 * Validate Email
 * ============================================================================
 *
 * @param {string} email
 * @returns {string}
 */
export const validateEmail = (email) => {

  const trimmedEmail = email?.trim();

  if (!trimmedEmail) {
    return VALIDATION_MESSAGES.EMAIL_REQUIRED;
  }

  if (!REGEX.EMAIL.test(trimmedEmail)) {
    return VALIDATION_MESSAGES.INVALID_EMAIL;
  }

  return "";

};

/**
 * ============================================================================
 * Validate Password
 * ============================================================================
 *
 * @param {string} password
 * @returns {string}
 */
export const validatePassword = (password) => {

  if (!password) {
    return VALIDATION_MESSAGES.PASSWORD_REQUIRED;
  }

  if (!REGEX.PASSWORD.test(password)) {
    return VALIDATION_MESSAGES.PASSWORD_INVALID;
  }

  return "";

};

/**
 * ============================================================================
 * Validate Login Form
 * ============================================================================
 *
 * @param {Object} formData
 * @returns {Object}
 */
export const validateLoginForm = ({
  email,
  password,
}) => {

  const errors = {

    email: validateEmail(email),

    password: validatePassword(password),

  };

  return {

    isValid: Object.values(errors).every(
      (error) => error === ""
    ),

    errors,

  };

};