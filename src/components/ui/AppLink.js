/**
 * ============================================================================
 * File: AppLink.js
 * Path: src/components/ui/AppLink.js
 * ----------------------------------------------------------------------------
 * Description:
 * Reusable clickable text component for the Rakshak application.
 *
 * Features:
 * • Theme based styling
 * • Press feedback
 * • Accessibility support
 * • Custom styling
 * ============================================================================
 */

import React from "react";

import {
  Pressable,
  StyleSheet,
} from "react-native";

import {
  COLORS,
  TYPOGRAPHY,
  TEXT_VARIANTS,
} from "../../constants/theme";

import AppText from "./AppText";

/**
 * Reusable Link Component
 *
 * Props:
 * children
 * onPress
 * color
 * variant
 * style
 * textStyle
 * disabled
 * accessibilityLabel
 */
export default function AppLink({
  children,
  onPress,
  color = COLORS.PRIMARY,
  variant = TEXT_VARIANTS.BODY,
  style,
  textStyle,
  disabled = false,
  accessibilityLabel,
}) {

  return (

    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={
        accessibilityLabel || children
      }
      style={({ pressed }) => [
        style,

        pressed &&
          !disabled &&
          styles.pressed,

        disabled &&
          styles.disabled,
      ]}
    >

      <AppText
        variant={variant}
        color={color}
        style={[
          styles.text,
          textStyle,
        ]}
      >
        {children}
      </AppText>

    </Pressable>

  );

}

const styles = StyleSheet.create({

  text: {
    textDecorationLine: "underline",
  },

  pressed: {
    opacity: 0.7,
  },

  disabled: {
    opacity: 0.5,
  },

});