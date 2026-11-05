/**
 * ============================================================================
 * File: StartupScreen.js
 * Path: src/screens/startup/StartupScreen.js
 * ----------------------------------------------------------------------------
 * Description:
 * Determines the initial navigation flow after all required permissions
 * have been granted.
 *
 * Responsibilities:
 * • Restore previous authentication session
 * • Update Redux authentication state
 * • Navigate to Authentication or Main Application
 * ============================================================================
 */

// Imports
import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { useDispatch } from "react-redux";

import { ROUTES } from "../../navigation/routes";

import { loginSuccess } from "../../redux/auth/authSlice";

import { restoreSession } from "./startupHandler";

// Startup Screen Component
const StartupScreen = ({ navigation }) => {

  /**
   * ==========================================================================
   * Redux
   * ==========================================================================
   */
  const dispatch = useDispatch();

  /**
   * ==========================================================================
   * Restore Session
   * ==========================================================================
   */
  useEffect(() => {

    initializeApp();

  }, []);

  /**
   * ==========================================================================
   * Initialize Application
   * ==========================================================================
   */
  const initializeApp = async () => {

    const result = await restoreSession();

    /**
     * Valid Session
     */
    if (result.success) {

      dispatch(
        loginSuccess(result.data)
      );

      navigation.replace(
        ROUTES.MAIN_TABS
      );

      return;

    }

    /**
     * No Session / Session Expired
     */
    navigation.replace(
      ROUTES.AUTH
    );

  };

  /**
   * ==========================================================================
   * Render UI
   * ==========================================================================
   */
  return (

    <View style={styles.container}>

      <ActivityIndicator
        size="large"
        color="#D32F2F"
      />

    </View>

  );

};

// Styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

});

export default StartupScreen;