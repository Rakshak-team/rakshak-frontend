/**
 * ============================================================================
 * File: AppButton.js
 * Path: src/components/ui/AppButton.js
 * ----------------------------------------------------------------------------
 * Description:
 * Reusable button component used throughout the Rakshak application.
 *
 * Features:
 * • Primary and Outline variants
 * • Loading state
 * • Disabled state
 * • Theme based styling
 * • Accessibility support
 * ============================================================================
 */

import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  BORDER_RADIUS,
} from "../../constants/theme";

import AppText from "./AppText";

/**
 * Reusable Button Component
 *
 * Props:
 * title               -> Button text
 * onPress             -> Button click handler
 * variant             -> "primary" | "outline"
 * disabled            -> Disable button
 * loading             -> Show loading spinner
 * style               -> Custom button style
 * textStyle           -> Custom text style
 * accessibilityLabel  -> Accessibility label
 */
export default function AppButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  style,
  textStyle,
  accessibilityLabel,
}) {

  /**
   * Button is disabled when
   * explicitly disabled or loading.
   */
  const isDisabled = disabled || loading;

  /**
   * Determine button variant.
   */
  const isOutline = variant === "outline";

  return (

    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      style={({ pressed }) => [

        styles.button,

        isOutline
          ? styles.outlineButton
          : styles.primaryButton,

        isDisabled &&
          styles.disabledButton,

        pressed &&
          !isDisabled &&
          styles.pressed,

        style,

      ]}
    >

      {loading ? (

        <ActivityIndicator
          size="small"
          color={
            isOutline
              ? COLORS.PRIMARY
              : COLORS.WHITE
          }
        />

      ) : (

        <AppText
          style={[

            styles.text,

            isOutline
              ? styles.outlineText
              : styles.primaryText,

            textStyle,

          ]}
        >
          {title}
        </AppText>

      )}

    </Pressable>

  );

}

const styles = StyleSheet.create({

  /**
   * Base Button
   */
  button: {
    width: "100%",
    paddingVertical: SPACING.MD,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDER_RADIUS.MD,
  },

  /**
   * Primary Button
   */
  primaryButton: {
    backgroundColor: COLORS.PRIMARY,
  },

  /**
   * Outline Button
   */
  outlineButton: {
    backgroundColor: COLORS.TRANSPARENT,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },

  /**
   * Disabled State
   */
  disabledButton: {
    opacity: 0.6,
  },

  /**
   * Pressed State
   */
  pressed: {
    opacity: 0.85,
  },

  /**
   * Button Text
   */
  text: {
    fontSize: TYPOGRAPHY.FONT_SIZE.MD,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
  },

  /**
   * Primary Text
   */
  primaryText: {
    color: COLORS.WHITE,
  },

  /**
   * Outline Text
   */
  outlineText: {
    color: COLORS.PRIMARY,
  },

});