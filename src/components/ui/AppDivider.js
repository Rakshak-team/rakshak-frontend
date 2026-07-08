/**
 * ============================================================================
 * File: AppDivider.js
 * Path: src/components/ui/AppDivider.js
 * ----------------------------------------------------------------------------
 * Description:
 * Reusable divider component for the Rakshak application.
 *
 * Features:
 * • Horizontal divider
 * • Optional text
 * • Theme based styling
 * ============================================================================
 */

import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import {
  COLORS,
  SPACING,
  TEXT_VARIANTS,
} from "../../constants/theme";

import AppText from "./AppText";

/**
 * Reusable Divider Component
 *
 * Props:
 * text
 * style
 */
export default function AppDivider({
  text,
  style,
}) {

  if (!text) {
    return <View style={[styles.divider, style]} />;
  }

  return (

    <View style={[styles.container, style]}>

      <View style={styles.line} />

      <AppText
        variant={TEXT_VARIANTS.CAPTION}
        color={COLORS.TEXT_SECONDARY}
        style={styles.text}
      >
        {text}
      </AppText>

      <View style={styles.line} />

    </View>

  );

}

const styles = StyleSheet.create({

  divider: {
    height: 1,
    backgroundColor: COLORS.BORDER,
    marginVertical: SPACING.LG,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING.LG,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.BORDER,
  },

  text: {
    marginHorizontal: SPACING.MD,
  },

});