/**
 * ============================================================================
 * File: AppText.js
 * Path: src/components/ui/AppText.js
 * ----------------------------------------------------------------------------
 * Description:
 * Reusable text component for the Rakshak application.
 *
 * Features:
 * • Centralized typography
 * • Theme based colors
 * • Multiple text variants
 * • Custom styling support
 * ============================================================================
 */

import React from "react";
import { Text, StyleSheet } from "react-native";

import {
  COLORS,
  TYPOGRAPHY,
  TEXT_VARIANTS,
} from "../../constants/theme";

/**
 * Reusable Text Component
 *
 * Props:
 * children -> Text content
 * variant  -> Typography variant
 * color    -> Custom text color
 * style    -> Additional styles
 */
export default function AppText({
  children,
  variant = TEXT_VARIANTS.BODY,
  color = COLORS.TEXT_PRIMARY,
  style,
  ...props
}) {
  return (
    <Text
      {...props}
      style={[
        styles.base,
        styles[variant],
        { color },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({

  /**
   * Base Typography
   */
  base: {
    color: COLORS.TEXT_PRIMARY,
  },

  /**
   * Display Text
   */
  display: {
    fontSize: TYPOGRAPHY.FONT_SIZE.DISPLAY,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.XL,
  },

  /**
   * Screen Titles
   */
  title: {
    fontSize: TYPOGRAPHY.FONT_SIZE.XXL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.LG,
  },

  /**
   * Section Headings
   */
  heading: {
    fontSize: TYPOGRAPHY.FONT_SIZE.XL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.LG,
  },

  /**
   * Subtitles
   */
  subtitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE.LG,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.MD,
  },

  /**
   * Body Text
   */
  body: {
    fontSize: TYPOGRAPHY.FONT_SIZE.MD,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.REGULAR,
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.MD,
  },

  /**
   * Caption Text
   */
  caption: {
    fontSize: TYPOGRAPHY.FONT_SIZE.SM,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.REGULAR,
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.SM,
  },

});