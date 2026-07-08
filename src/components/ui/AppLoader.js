/**
 * ============================================================================
 * File: AppLoader.js
 * Path: src/components/ui/AppLoader.js
 * ----------------------------------------------------------------------------
 * Description:
 * Reusable loading component for the Rakshak application.
 *
 * Features:
 * • Activity indicator
 * • Optional loading message
 * • Theme based styling
 * ============================================================================
 */

import React from "react";

import {
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";

import {
  COLORS,
  SPACING,
  TEXT_VARIANTS,
} from "../../constants/theme";

import AppText from "./AppText";

/**
 * Reusable Loader Component
 *
 * Props:
 * message
 * size
 */
export default function AppLoader({
  message = "Loading...",
  size = "large",
}) {

  return (

    <View style={styles.container}>

      <ActivityIndicator
        size={size}
        color={COLORS.PRIMARY}
      />

      <AppText
        variant={TEXT_VARIANTS.BODY}
        color={COLORS.TEXT_SECONDARY}
        style={styles.message}
      >
        {message}
      </AppText>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.XL,
  },

  message: {
    marginTop: SPACING.MD,
  },

});