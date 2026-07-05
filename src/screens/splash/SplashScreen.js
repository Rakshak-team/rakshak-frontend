/**
 * ============================================================================
 * File: SplashScreen.js
 * Path: src/screens/splash/SplashScreen.js
 * ----------------------------------------------------------------------------
 * Description:
 * Splash screen displayed when the application launches.
 *
 * Responsibilities:
 * • Display Rakshak branding
 * • Perform initial app loading
 * • Navigate to Permission Screen
 * ============================================================================
 */

// Imports
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { ROUTES } from "../../navigation/routes";

// Splash Screen Component
const SplashScreen = ({ navigation }) => {

  useEffect(() => {

    // Simulate app initialization before moving to the permission flow
    const timer = setTimeout(() => {
      navigation.replace(ROUTES.PERMISSION);
    }, 2000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);

  }, [navigation]);

  return (
    <View style={styles.container}>

      <Text style={styles.logo}>
        Rakshak
      </Text>

      <Text style={styles.tagline}>
        A Hyper-Local Shield for a Safer India
      </Text>

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

  // App logo
  logo: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#D32F2F",
  },

  // App tagline
  tagline: {
    marginTop: 12,
    fontSize: 16,
    color: "#555555",
    textAlign: "center",
    paddingHorizontal: 24,
  },

});

export default SplashScreen;