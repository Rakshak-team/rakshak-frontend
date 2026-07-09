/**
 * ============================================================================
 * File: registerStyles.js
 * Path: src/screens/auth/Register/registerStyles.js
 * ----------------------------------------------------------------------------
 * Description:
 * Styles for the Register screen.
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
 * Register Screen Styles
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
   * Registration Form
   */
  form: {
    marginTop: SPACING.XXL,
    gap: SPACING.LG,
  },

  /**
   * Volunteer Cards Container
   */
  volunteerContainer: {
    gap: SPACING.MD,
  },

  /**
   * Volunteer Card
   */
  volunteerCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    padding: SPACING.LG,
    gap: SPACING.XS,
  },

  /**
   * Selected Volunteer Card
   */
  selectedCard: {
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
  },

  /**
   * Bottom Login Section
   */
  loginContainer: {
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