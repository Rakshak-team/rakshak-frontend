/**
 * ============================================================================
 * File: AppInput.js
 * Path: src/components/ui/AppInput.js
 * ----------------------------------------------------------------------------
 * Description:
 * Reusable text input component for the Rakshak application.
 *
 * Features:
 * • Optional label
 * • Error message
 * • Secure text entry
 * • Password visibility toggle
 * • Focus state
 * • Disabled state
 * • Theme based styling
 * • Accessibility support
 * ============================================================================
 */

import React, { useState } from "react";

import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  BORDER_RADIUS,
  TEXT_VARIANTS,
} from "../../constants/theme";

import AppText from "./AppText";

/**
 * Reusable Input Component
 *
 * Props:
 * label
 * value
 * onChangeText
 * placeholder
 * secureTextEntry
 * keyboardType
 * autoCapitalize
 * error
 * editable
 * style
 */
export default function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  error,
  editable = true,
  style,
  ...props
}) {

  /**
   * Password visibility state.
   */
  const [hidePassword, setHidePassword] =
    useState(secureTextEntry);

  /**
   * Input focus state.
   */
  const [isFocused, setIsFocused] =
    useState(false);

  return (

    <View style={style}>

      {/* ===========================
              Label
      ============================ */}
      {label && (
        <AppText
          variant={TEXT_VARIANTS.SUBTITLE}
          style={styles.label}
        >
          {label}
        </AppText>
      )}

      {/* ===========================
            Input Container
      ============================ */}
      <View
        style={[
          styles.inputContainer,

          isFocused && styles.focusedBorder,

          error && styles.errorBorder,

          !editable && styles.disabledContainer,
        ]}
      >

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.TEXT_DISABLED}
          secureTextEntry={hidePassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          style={styles.input}
          accessibilityLabel={label || placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* ===========================
            Password Toggle
        ============================ */}
        {secureTextEntry && (

          <Pressable
            hitSlop={10}
            onPress={() =>
              setHidePassword(!hidePassword)
            }
          >

            <MaterialCommunityIcons
              name={
                hidePassword
                  ? "eye-off"
                  : "eye"
              }
              size={22}
              color={COLORS.TEXT_SECONDARY}
            />

          </Pressable>

        )}

      </View>

      {/* ===========================
            Error Message
      ============================ */}
      {error && (

        <AppText
          variant={TEXT_VARIANTS.CAPTION}
          color={COLORS.ERROR}
          style={styles.error}
        >
          {error}
        </AppText>

      )}

    </View>

  );

}

const styles = StyleSheet.create({

  /**
   * Input Label
   */
  label: {
    marginBottom: SPACING.SM,
  },

  /**
   * Input Container
   */
  inputContainer: {

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: COLORS.WHITE,

    borderWidth: 1,

    borderColor: COLORS.BORDER,

    borderRadius: BORDER_RADIUS.MD,

    paddingHorizontal: SPACING.MD,

  },

  /**
   * Focused Border
   */
  focusedBorder: {
    borderColor: COLORS.PRIMARY,
  },

  /**
   * Error Border
   */
  errorBorder: {
    borderColor: COLORS.ERROR,
  },

  /**
   * Disabled State
   */
  disabledContainer: {
    opacity: 0.6,
  },

  /**
   * Text Input
   */
  input: {

    flex: 1,

    paddingVertical: SPACING.MD,

    fontSize: TYPOGRAPHY.FONT_SIZE.MD,

    color: COLORS.TEXT_PRIMARY,

  },

  /**
   * Error Message
   */
  error: {
    marginTop: SPACING.XS,
  },

});