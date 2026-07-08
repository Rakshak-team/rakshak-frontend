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

/**
 * ============================================================================
 * Backend Base URL
 * ----------------------------------------------------------------------------
 * Replace this URL according to the environment.
 *
 * Android Emulator:
 * http://10.0.2.2:8080
 *
 * Physical Android Device:
 * http://YOUR_LOCAL_IP:8080
 *
 * Example:
 * http://192.168.1.10:8080
 * ============================================================================
 */
const BASE_URL = "http://YOUR_LOCAL_IP:8080";

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