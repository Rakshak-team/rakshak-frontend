/**
 * ============================================================================
 * File: registerValidation.js
 * Path: src/screens/auth/Register/registerValidation.js
 * ----------------------------------------------------------------------------
 * Description:
 * Validation utility for the Register module.
 *
 * Responsibilities:
 * • Validate common registration fields
 * • Validate Medical Professional specific fields
 * • Validate complete registration form
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
 * Validate First Name
 * ============================================================================
 */
export const validateFirstName = (firstName) => {

  if (!firstName?.trim()) {
    return VALIDATION_MESSAGES.FIRST_NAME_REQUIRED;
  }

  return "";

};

/**
 * ============================================================================
 * Validate Last Name
 * ============================================================================
 */
export const validateLastName = (lastName) => {

  if (!lastName?.trim()) {
    return VALIDATION_MESSAGES.LAST_NAME_REQUIRED;
  }

  return "";

};

/**
 * ============================================================================
 * Validate Email
 * ============================================================================
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
 * Validate Phone Number
 * ============================================================================
 */
export const validatePhoneNumber = (phoneNumber) => {

  const trimmedPhone = phoneNumber?.trim();

  if (!trimmedPhone) {
    return VALIDATION_MESSAGES.PHONE_REQUIRED;
  }

  if (!REGEX.PHONE.test(trimmedPhone)) {
    return VALIDATION_MESSAGES.INVALID_PHONE;
  }

  return "";

};

/**
 * ============================================================================
 * Validate Blood Group
 * ============================================================================
 */
export const validateBloodGroup = (bloodGroup) => {

  if (!bloodGroup) {
    return VALIDATION_MESSAGES.BLOOD_GROUP_REQUIRED;
  }

  return "";

};

/**
 * ============================================================================
 * Validate Password
 * ============================================================================
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
 * Validate Confirm Password
 * ============================================================================
 */
export const validateConfirmPassword = (
  password,
  confirmPassword
) => {

  if (!confirmPassword) {
    return VALIDATION_MESSAGES.CONFIRM_PASSWORD_REQUIRED;
  }

  if (password !== confirmPassword) {
    return VALIDATION_MESSAGES.PASSWORDS_DO_NOT_MATCH;
  }

  return "";

};

/**
 * ============================================================================
 * Validate Medical Profession
 * ============================================================================
 */
export const validateMedicalProfession = (
  medicalProfession
) => {

  if (!medicalProfession?.trim()) {
    return VALIDATION_MESSAGES.MEDICAL_PROFESSION_REQUIRED;
  }

  return "";

};

/**
 * ============================================================================
 * Validate Registered Organization
 * ============================================================================
 */
export const validateOrganization = (
  organization
) => {

  if (!organization?.trim()) {
    return VALIDATION_MESSAGES.ORGANIZATION_REQUIRED;
  }

  return "";

};

/**
 * ============================================================================
 * Validate Registration Number
 * ============================================================================
 */
export const validateRegistrationNumber = (
  registrationNumber
) => {

  if (!registrationNumber?.trim()) {
    return VALIDATION_MESSAGES.REGISTRATION_NUMBER_REQUIRED;
  }

  return "";

};

/**
 * ============================================================================
 * Validate Register Form
 * ============================================================================
 */
export const validateRegisterForm = (formData) => {

  const errors = {

    firstName: validateFirstName(
      formData.firstName
    ),

    lastName: validateLastName(
      formData.lastName
    ),

    email: validateEmail(
      formData.email
    ),

    phoneNumber: validatePhoneNumber(
      formData.phoneNumber
    ),

    bloodGroup: validateBloodGroup(
      formData.bloodGroup
    ),

    password: validatePassword(
      formData.password
    ),

    confirmPassword:
      validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      ),

    medicalProfession: "",

    organization: "",

    registrationNumber: "",

  };

  /**
   * Additional validation
   * for Medical Professionals
   */
  if (
    formData.volunteerType ===
    "MEDICAL"
  ) {

    errors.medicalProfession =
      validateMedicalProfession(
        formData.medicalProfession
      );

    errors.organization =
      validateOrganization(
        formData.organization
      );

    errors.registrationNumber =
      validateRegistrationNumber(
        formData.registrationNumber
      );

  }

  return {

    isValid: Object.values(errors).every(
      (error) => error === ""
    ),

    errors,

  };

};