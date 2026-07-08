/**
 * ============================================================================
 * File: AppLogo.js
 * Path: src/components/ui/AppLogo.js
 * ----------------------------------------------------------------------------
 * Description:
 * Reusable Rakshak logo component.
 *
 * Features:
 * • Shield icon
 * • App name
 * • Tagline
 * • Theme based styling
 * ============================================================================
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../constants/theme";

/**
 * Reusable App Logo Component
 */
export default function AppLogo() {
  return (
    <View style={styles.container}>

      <MaterialCommunityIcons
        name="shield-check"
        size={72}
        color={COLORS.PRIMARY}
      />

      <Text style={styles.title}>
        Rakshak
      </Text>

      <Text style={styles.tagline}>
        Hyper-Local Emergency{"\n"}Response Platform
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    marginTop: SPACING.MD,
    fontSize: TYPOGRAPHY.FONT_SIZE.DISPLAY,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
    color: COLORS.TEXT_PRIMARY,
  },

  tagline: {
    marginTop: SPACING.SM,
    textAlign: "center",
    fontSize: TYPOGRAPHY.FONT_SIZE.MD,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.REGULAR,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 24,
  },

});