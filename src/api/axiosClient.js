/**
 * ============================================================================
 * File: axiosClient.js
 * Path: src/api/axiosClient.js
 * ----------------------------------------------------------------------------
 * Description:
 * Centralized Axios client for the Rakshak application.
 *
 * Responsibilities:
 * • Create a single Axios instance
 * • Configure base URL
 * • Configure request timeout
 * • Configure default headers
 * • Export the configured client
 * ============================================================================
 */

// Imports
import axios from "axios";
import { BASE_URL } from "../config/env";

/**
 * ============================================================================
 * Central Axios Instance
 * ============================================================================
 */
const axiosClient = axios.create({

  // Backend URL
  baseURL: BASE_URL,

  // Request timeout (15 seconds)
  timeout: 15000,

  // Default request headers
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

});

/**
 * ============================================================================
 * Export Axios Client
 * ============================================================================
 */
export default axiosClient;