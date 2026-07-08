/**
 * ============================================================================
 * File: regex.js
 * Path: src/constants/regex.js
 * ----------------------------------------------------------------------------
 * Description:
 * Centralized regular expressions used throughout the Rakshak application.
 *
 * Responsibilities:
 * • Email validation
 * • Phone validation
 * • Password validation
 * • Future reusable regex patterns
 * ============================================================================
 */

/**
 * ============================================================================
 * Regular Expressions
 * ============================================================================
 */
export const REGEX = {

  /**
   * Email Address
   */
  EMAIL:
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  /**
   * Indian Mobile Number
   */
  PHONE:
    /^[6-9]\d{9}$/,

  /**
   * Password
   *
   * Minimum 8 characters
   * At least one uppercase
   * At least one lowercase
   * At least one number
   * At least one special character
   */
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,

};