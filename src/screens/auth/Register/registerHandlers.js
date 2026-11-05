/**
 * ============================================================================
 * File: registerHandlers.js
 * Path: src/screens/auth/Register/registerHandlers.js
 * ----------------------------------------------------------------------------
 * Description:
 * Business logic for the Register module.
 *
 * Responsibilities:
 * • Validate registration form
 * • Register new user
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
  validateRegisterForm,
} from "./registerValidation";

import {
  registerUser,
} from "./registerService";

import {
  createSuccessResponse,
  createErrorResponse,
} from "../../../utils";

/**
 * ============================================================================
 * Handle Register
 * ============================================================================
 *
 * @param {Object} formData
 * @returns {Promise<Object>}
 */
export const handleRegister = async (formData) => {

  /**
   * Validate Form
   */
  const validation = validateRegisterForm(formData);

  if (!validation.isValid) {

    return createErrorResponse({

      errors: validation.errors,

    });

  }

  try {

    /**
     * Register API
     */
    const response = await registerUser({

      volunteerType: formData.volunteerType,

      firstName: formData.firstName.trim(),

      lastName: formData.lastName.trim(),

      email: formData.email.trim().toLowerCase(),

      phoneNumber: formData.phoneNumber.trim(),

      bloodGroup: formData.bloodGroup,

      password: formData.password,
      confirmPassword: formData.confirmPassword,

      medicalProfession:
        formData.volunteerType === "MEDICAL"
          ? formData.medicalProfession.trim()
          : null,

      organization:
        formData.volunteerType === "MEDICAL"
          ? formData.organization.trim()
          : null,

      registrationNumber:
        formData.volunteerType === "MEDICAL"
          ? formData.registrationNumber.trim()
          : null,

    });

    /**
     * Success Response
     */
    return createSuccessResponse({

      message: AUTH_MESSAGES.REGISTER_SUCCESS,

      data: response,

    });

  } catch (error) {

    console.log("========== REGISTRATION ERROR ==========");
    console.log("Error message:", error?.message);
    console.log("HTTP status:", error?.response?.status);
    console.log("Backend response:", error?.response?.data);
    console.log("Request URL:", error?.config?.url);
    console.log("Request method:", error?.config?.method);
    console.log("=========================================");

    return createErrorResponse({
      message:
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        AUTH_MESSAGES.REGISTER_FAILED,


  });

}}