/**
 * ============================================================================
 * File: LoginScreen.js
 * Path: src/screens/auth/Login/LoginScreen.js
 * ----------------------------------------------------------------------------
 * Description:
 * Login screen of the Rakshak application.
 *
 * Responsibilities:
 * • Render login UI
 * • Manage local UI state
 * • Trigger authentication
 * • Navigate to Register screen
 * • Display validation/API messages
 * ============================================================================
 */

// Imports
import React, { useState } from "react";
import { View } from "react-native";

import { ROUTES } from "../../../navigation/routes";

import {
  COLORS,
  TEXT_VARIANTS,
} from "../../../constants/theme";

import {
  AppButton,
  AppInput,
  AppLink,
  AppLogo,
  AppScreen,
  AppSnackbar,
  AppText,
} from "../../../components/ui";

import {
  handleForgotPassword,
  handleLogin,
} from "./loginHandlers";

import styles from "./loginStyles";

/**
 * ============================================================================
 * Login Screen
 * ============================================================================
 */
const LoginScreen = ({ navigation }) => {

  /**
   * ==========================================================================
   * Form State
   * ==========================================================================
   */
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  /**
   * ==========================================================================
   * UI State
   * ==========================================================================
   */
  const [loading, setLoading] = useState(false);

  const [snackbarVisible, setSnackbarVisible] =
    useState(false);

  const [snackbarMessage, setSnackbarMessage] =
    useState("");

  const [snackbarType, setSnackbarType] =
    useState("info");

  /**
   * ==========================================================================
   * Login Button
   * ==========================================================================
   */
  const onLoginPress = async () => {

    setLoading(true);

    const result = await handleLogin({

      email,

      password,

    });

    setLoading(false);

    /**
     * Validation / API Failed
     */
    if (!result.success) {

      setErrors(result.errors || {});

      if (result.message) {

        setSnackbarMessage(result.message);

        setSnackbarType("error");

        setSnackbarVisible(true);

      }

      return;

    }

    /**
     * Clear Previous Errors
     */
    setErrors({});

    /**
     * Success Message
     */
    setSnackbarMessage(result.message);

    setSnackbarType("success");

    setSnackbarVisible(true);

    /**
     * Navigate To Main Application
     */
    navigation.replace(
      ROUTES.MAIN_TABS
    );

  };

  /**
   * ==========================================================================
   * Forgot Password
   * ==========================================================================
   */
  const onForgotPasswordPress = () => {

    const result = handleForgotPassword();

    setSnackbarMessage(result.message);

    setSnackbarType("info");

    setSnackbarVisible(true);

  };

  /**
   * ==========================================================================
   * Render UI
   * ==========================================================================
   */
  return (

    <AppScreen
      scrollable
      keyboardAware
    >

      <View style={styles.container}>

        {/* ==========================================================
            Header
        ========================================================== */}

        <View style={styles.header}>

          <AppLogo />

          <AppText
            variant={TEXT_VARIANTS.TITLE}
          >
            Welcome Back
          </AppText>

          <AppText
            variant={TEXT_VARIANTS.BODY}
            color={COLORS.TEXT_SECONDARY}
          >
            Sign in to continue using Rakshak.
          </AppText>

        </View>

        {/* ==========================================================
            Login Form
        ========================================================== */}

        <View style={styles.form}>

          <AppInput
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />

          <AppInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />

          <AppLink
            style={styles.forgotPassword}
            onPress={onForgotPasswordPress}
          >
            Forgot Password?
          </AppLink>

          <AppButton
            title="Login"
            loading={loading}
            onPress={onLoginPress}
          />

        </View>

        {/* ==========================================================
            Register Section
        ========================================================== */}

        <View style={styles.registerContainer}>

          <AppText
            variant={TEXT_VARIANTS.BODY}
          >
            Don't have an account?
          </AppText>

          <AppLink
            onPress={() =>
              navigation.navigate(
                ROUTES.REGISTER
              )
            }
          >
            Create Account
          </AppLink>

        </View>

      </View>

      {/* ==========================================================
          Snackbar
      ========================================================== */}

      <AppSnackbar
        visible={snackbarVisible}
        message={snackbarMessage}
        type={snackbarType}
        onDismiss={() =>
          setSnackbarVisible(false)
        }
      />

    </AppScreen>

  );

};

export default LoginScreen;