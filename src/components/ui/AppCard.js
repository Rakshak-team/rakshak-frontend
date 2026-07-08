/**
 * ============================================================================
 * File: AppCard.js
 * Path: src/components/common/AppCard.js
 * ----------------------------------------------------------------------------
 * Description:
 * A reusable card component used throughout the Rakshak application.
 *
 * Features:
 * • Consistent styling
 * • Reusable
 * • Custom content using children
 * • Optional onPress support
 * ============================================================================
 */

import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
} from "../../constants/theme";

/**
 * Reusable Card Component
 *
 * Props:
 * children -> Card Content
 * onPress  -> Optional click handler
 * style    -> Optional custom styling
 */
export default function AppCard({
  children,
  onPress,
  style,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,

        // Slight opacity when pressed
        pressed && styles.pressed,

        style,
      ]}
      onPress={onPress}
    >
      <View>
        {children}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: COLORS.WHITE,

    padding: SPACING.MD,

    borderRadius: BORDER_RADIUS.LG,

    borderWidth: 1,

    borderColor: COLORS.BORDER,
  },

  pressed: {
    opacity: 0.8,
  },

});