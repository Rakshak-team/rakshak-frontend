
/**
 * ============================================================================
 * File: AppNavigator.js
 * Path: src/navigation/AppNavigator.js
 * ----------------------------------------------------------------------------
 * Description:
 * Root navigator of the Rakshak application.
 *
 * Responsibilities:
 * • Launch the application
 * • Display Splash Screen
 * • Handle Permission Flow
 * • Navigate to Authentication or Main App
 * • Handle incident reporting navigation
 * • Handle incident details navigation
 * ============================================================================
 */

// Imports
import React from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

// Navigation
import AuthStack from "./AuthStack";
import MainTabNavigator from "./MainTabNavigator";
import { ROUTES } from "./routes";

// Screens
import SplashScreen from "../screens/splash/SplashScreen";
import PermissionScreen from "../screens/permissions/PermissionScreen";
import StartupScreen from "../screens/startup/StartupScreen";
import ReportIncidentScreen from "../screens/incidents/ReportIncidentScreen";
import IncidentDetailsScreen from "../screens/incidents/IncidentDetailsScreen";

// ============================================================================
// Create Native Stack Navigator
// ============================================================================

const Stack = createNativeStackNavigator();

// ============================================================================
// Root Navigator
// ============================================================================

const AppNavigator = () => {

  return (

    <NavigationContainer>

      <Stack.Navigator
        initialRouteName={ROUTES.SPLASH}
        screenOptions={{

          // Hide default navigation header
          headerShown: false,

        }}
      >

        {/* ================================================================
            Splash Screen
        ================================================================ */}

        <Stack.Screen
          name={ROUTES.SPLASH}
          component={SplashScreen}
        />

        {/* ================================================================
            Permission Screen
        ================================================================ */}

        <Stack.Screen
          name={ROUTES.PERMISSION}
          component={PermissionScreen}
        />

        {/* ================================================================
            Startup Screen
        ================================================================ */}

        <Stack.Screen
          name={ROUTES.STARTUP}
          component={StartupScreen}
        />

        {/* ================================================================
            Authentication Flow
        ================================================================ */}

        <Stack.Screen
          name={ROUTES.AUTH}
          component={AuthStack}
        />

        {/* ================================================================
            Main Application
        ================================================================ */}

        <Stack.Screen
          name={ROUTES.MAIN_TABS}
          component={MainTabNavigator}
        />

        {/* ================================================================
            Incident Reporting Screen
        ================================================================ */}

        <Stack.Screen
          name={ROUTES.REPORT_INCIDENT}
          component={ReportIncidentScreen}
        />

        {/* ================================================================
            Incident Details Screen
        ================================================================ */}

        <Stack.Screen
          name={ROUTES.INCIDENT_DETAILS}
          component={IncidentDetailsScreen}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );

};

// ============================================================================
// Export
// ============================================================================

export default AppNavigator;
