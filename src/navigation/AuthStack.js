/**
 * ============================================================================
 * File: AuthStack.js
 * Path: src/navigation/AuthStack.js
 * ----------------------------------------------------------------------------
 * Description:
 * Handles the complete authentication navigation flow of the application.
 * It contains all authentication-related screens:
 * - Welcome Screen
 * - Login Screen
 * - Register Screen
 *
 * This stack is displayed only when the user is NOT authenticated.
 * ============================================================================
 */

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Route constants
import { ROUTES } from "./routes";

// Authentication Screens
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

// Create Native Stack Navigator
const Stack = createNativeStackNavigator();

/**
 * Authentication Stack Navigator
 *
 * Controls the navigation flow for unauthenticated users.
 */
export default function AuthStack() {
  return (
    <Stack.Navigator
      // First screen shown when this stack loads
      initialRouteName={ROUTES.WELCOME}
      screenOptions={{
        // Hide the default navigation header
        headerShown: false,

        // Screen transition animation
        animation: "slide_from_right",

        // Background color during screen transitions
        contentStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      {/* Welcome Screen */}
      <Stack.Screen
        name={ROUTES.WELCOME}
        component={WelcomeScreen}
      />

      {/* Login Screen */}
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={LoginScreen}
      />

      {/* Register Screen */}
      <Stack.Screen
        name={ROUTES.REGISTER}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
}