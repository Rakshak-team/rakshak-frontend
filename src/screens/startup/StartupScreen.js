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
 * • Check user authentication
 * • Navigate to AuthStack or MainTabNavigator
 *
 * Note:
 * Authentication logic will be implemented once backend integration
 * is completed.
 * ============================================================================
 */

// Imports
import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { useSelector } from "react-redux";

import { ROUTES } from "../../navigation/routes";

// Startup Screen Component
const StartupScreen = ({ navigation }) => {

  // Read authentication state from Redux
  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {

    initializeApp();

  }, []);

  // Decide where the user should go
  const initializeApp = () => {

    if (isAuthenticated) {

      // User already logged in
      navigation.replace(ROUTES.MAIN_TABS);
      return;

    }

    // User needs to login/register
    navigation.replace(ROUTES.AUTH);

  };

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

  // Main container
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

});

export default StartupScreen;