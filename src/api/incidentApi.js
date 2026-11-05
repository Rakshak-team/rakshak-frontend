
/**
 * ============================================================================
 * File: incidentApi.js
 * Path: src/api/incidentApi.js
 * ----------------------------------------------------------------------------
 * Description:
 * Incident API layer for the Rakshak application.
 *
 * Responsibilities:
 * • Upload incident photographs
 * • Submit new incident reports
 * • Fetch incidents reported by the logged-in user
 * • Fetch details of a specific incident
 *
 * Note:
 * This file should only communicate with the backend.
 * No validation, navigation or business logic should exist here.
 * ============================================================================
 */

// Imports
import axiosClient from "./axiosClient";
import {
  INCIDENT_ENDPOINTS,
  UPLOAD_ENDPOINTS,
} from "./endpoints";

// ============================================================================
// Upload Incident Image
// ============================================================================

/**
 * @param {Object} image
 * @returns {Promise}
 */
export const uploadIncidentImage = (image) => {
  const formData = new FormData();

  // Append captured image to multipart request
  formData.append("file", {
    uri: image.uri,
    name: image.fileName || `incident_${Date.now()}.jpg`,
    type: image.type || "image/jpeg",
  });

  return axiosClient.post(
    UPLOAD_ENDPOINTS.INCIDENT_IMAGE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// ============================================================================
// Report New Incident
// ============================================================================

/**
 * @param {Object} incidentData
 * @returns {Promise}
 */
export const reportIncident = (incidentData) => {
  return axiosClient.post(
    INCIDENT_ENDPOINTS.REPORT,
    incidentData
  );
};

// ============================================================================
// Get My Reported Incidents
// ============================================================================

/**
 * Fetches incidents reported by the currently authenticated user.
 *
 * Backend endpoint:
 * GET /incidents/my
 *
 * @returns {Promise}
 */
export const getMyIncidents = () => {
  return axiosClient.get(
    INCIDENT_ENDPOINTS.GET_MY
  );
};

// ============================================================================
// Get Incident Details By ID
// ============================================================================

/**
 * Fetches complete details of a specific incident.
 *
 * Backend endpoint:
 * GET /incidents/{id}
 *
 * @param {number|string} incidentId
 * @returns {Promise}
 */
export const getIncidentById = (incidentId) => {
  const endpoint = INCIDENT_ENDPOINTS.GET_BY_ID.replace(
    ":id",
    String(incidentId)
  );

  return axiosClient.get(endpoint);
};
