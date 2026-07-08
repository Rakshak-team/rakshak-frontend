/**
 * ============================================================================
 * File: AppSnackbar.js
 * Path: src/components/ui/AppSnackbar.js
 * ----------------------------------------------------------------------------
 * Description:
 * Reusable Snackbar component for the Rakshak application.
 *
 * Responsibilities:
 * • Display success, error, warning and info messages
 * • Provide consistent user feedback
 * • Centralized snackbar UI
 * ============================================================================
 */

import React from "react";

import { Snackbar } from "react-native-paper";

import {
  COLORS,
} from "../../constants/theme";

/**
 * ============================================================================
 * Reusable Snackbar Component
 * ============================================================================
 */
export default function AppSnackbar({

  visible,

  message,

  onDismiss,

  duration = 3000,

  type = "info",

}) {

  /**
   * Snackbar Background Color
   */
  const getBackgroundColor = () => {

    switch (type) {

      case "success":
        return COLORS.SUCCESS;

      case "error":
        return COLORS.ERROR;

      case "warning":
        return COLORS.WARNING;

      default:
        return COLORS.TEXT_PRIMARY;

    }

  };

  return (

    <Snackbar

      visible={visible}

      onDismiss={onDismiss}

      duration={duration}

      style={{
        backgroundColor: getBackgroundColor(),
      }}

      action={{
        label: "Dismiss",
        textColor: COLORS.WHITE,
        onPress: onDismiss,
      }}

    >

      {message}

    </Snackbar>

  );

}