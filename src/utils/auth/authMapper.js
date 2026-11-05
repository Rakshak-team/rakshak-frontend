
/**
 * ============================================================================
 * File: authMapper.js
 * Path: src/utils/auth/authMapper.js
 * ----------------------------------------------------------------------------
 * Description:
 * Maps the backend authentication response to the frontend authentication
 * model used by Redux.
 *
 * Responsibilities:
 * • Normalize authentication response
 * • Keep login and auto-login consistent
 * • Prevent duplicated mapping logic
 * ============================================================================
 */

/**
 * ============================================================================
 * Map Authentication Response
 * ============================================================================
 *
 * @param {Object} response
 * @returns {Object}
 */
export const mapAuthResponse = (response) => ({

  user: {

    // Basic User Information
    userId: response.userId,

    firstName: response.firstName,

    lastName: response.lastName,

    fullName: response.fullName,

    email: response.email,

    phoneNumber: response.phoneNumber,

    bloodGroup: response.bloodGroup,

    // Volunteer Information
    role: response.role,

    medicalProfession: response.medicalProfession,

    organization: response.organization,

    registrationNumber: response.registrationNumber,

    // Profile Information
    profileImageUrl: response.profileImageUrl,

    // Account Information
    enabled: response.enabled,

    verified: response.verified,

    accountStatus: response.accountStatus,

  },

  // Authentication Tokens
  accessToken: response.accessToken,

  refreshToken: response.refreshToken,

});
