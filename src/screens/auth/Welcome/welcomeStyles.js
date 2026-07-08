/**
 * ============================================================================
 * File: welcomeStyles.js
 * Path: src/screens/auth/Welcome/welcomeStyles.js
 * ----------------------------------------------------------------------------
 * Description:
 * Styles for the Welcome Screen.
 * ============================================================================
 */

import { StyleSheet } from "react-native";

import {
  SPACING,
  TYPOGRAPHY,
} from "../../../constants/theme";

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
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * Description
   */
  description: {
    marginTop: SPACING.XL,
    textAlign: "center",
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.MD,
    paddingHorizontal: SPACING.SM,
  },

  /**
   * Action Buttons
   */
  actions: {
    flex: 1,
    justifyContent: "center",
  },

  /**
   * Register Button
   */
  registerButton: {
    marginTop: SPACING.MD,
  },

});

export default styles;