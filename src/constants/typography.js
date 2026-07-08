/**
 * ============================================================================
 * File: typography.js
 * Path: src/constants/typography.js
 * ----------------------------------------------------------------------------
 * Description:
 * Centralized typography configuration for the Rakshak application.
 *
 * Exports:
 * • Font Sizes
 * • Font Weights
 * • Line Heights
 * • Text Variants
 * ============================================================================
 */

export const TYPOGRAPHY = {

  /**
   * Standard Font Sizes
   */
  FONT_SIZE: {
    XS: 12,
    SM: 14,
    MD: 16,
    LG: 18,
    XL: 22,
    XXL: 28,
    DISPLAY: 36,
  },

  /**
   * Standard Font Weights
   */
  FONT_WEIGHT: {
    REGULAR: "400",
    MEDIUM: "500",
    SEMIBOLD: "600",
    BOLD: "700",
  },

  /**
   * Standard Line Heights
   */
  LINE_HEIGHT: {
    SM: 20,
    MD: 24,
    LG: 28,
    XL: 36,
  },

};

/**
 * Typography Variants
 *
 * Prevents hardcoded strings such as:
 * variant="title"
 */
export const TEXT_VARIANTS = {

  DISPLAY: "display",

  TITLE: "title",

  HEADING: "heading",

  SUBTITLE: "subtitle",

  BODY: "body",

  CAPTION: "caption",

};