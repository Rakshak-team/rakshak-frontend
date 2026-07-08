/**
 * ============================================================================
 * File: index.js
 * Path: src/api/index.js
 * ----------------------------------------------------------------------------
 * Description:
 * Barrel exports for all API modules used in the Rakshak application.
 *
 * Responsibilities:
 * • Provide a single import point for API modules
 * • Keep imports clean and maintainable
 * • Avoid importing individual API files throughout the project
 * ============================================================================
 */

/**
 * ============================================================================
 * Axios Client
 * ============================================================================
 */
export { default as axiosClient } from "./axiosClient";

/**
 * ============================================================================
 * API Endpoints
 * ============================================================================
 */
export * from "./endpoints";

/**
 * ============================================================================
 * Authentication APIs
 * ============================================================================
 */
export * from "./authApi";