/**
 * ============================================================================
 * File: theme.js
 * Path: src/constants/theme.js
 * ----------------------------------------------------------------------------
 * Description:
 * Centralized Design System for the Rakshak application.
 *
 * Exports:
 * - Colors
 * - Spacing
 * - Typography
 * - Border Radius
 *
 * Import this file instead of importing individual constants
 * inside screens and components.
 * ============================================================================
 */

import { COLORS } from "./colors";
import { SPACING } from "./spacing";
import { TYPOGRAPHY } from "./typography";

/**
 * Standard border radius values
 * used throughout the application.
 */
export const BORDER_RADIUS = {
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 24,
};

export {
  COLORS,
  SPACING,
  TYPOGRAPHY,
};