/**
 * ============================================================================
 * File: loginStyles.js
 * Path: src/screens/auth/Login/loginStyles.js
 * ----------------------------------------------------------------------------
 * Description:
 * Styles for the Login screen.
 *
 * Responsibilities:
 * • Maintain consistent UI styling
 * • Use centralized theme constants
 * • Avoid hardcoded values
 * ============================================================================
 */

// Imports
import { StyleSheet } from "react-native";

import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
} from "../../../constants/theme";

/**
 * ============================================================================
 * Login Screen Styles
 * ============================================================================
 */
const styles = StyleSheet.create({

  /**
   * Main Container
   */
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: SPACING.XL,
  },

  /**
   * Header Section
   */
  header: {
    alignItems: "center",
    justifyContent: "center",
  },

  /**
   * Login Form
   */
  form: {
    marginTop: SPACING.XXL,
    gap: SPACING.LG,
  },

  /**
   * Forgot Password Link
   */
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -SPACING.SM,
  },

  /**
   * Bottom Register Section
   */
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.SM,
    marginTop: SPACING.XXL,
    marginBottom: SPACING.LG,
  },

  /**
   * Card Style (Future Use)
   */
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.XL,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },

});

export default styles;