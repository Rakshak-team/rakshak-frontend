/**
 * ============================================================================
 * File: AppNavigator.js
 * Path: src/navigation/AppNavigator.js
 * ----------------------------------------------------------------------------
 * Description:
 * Root Navigator of the application.
 *
 * Responsible for deciding which navigation flow should be displayed:
 *
 * • AuthStack          -> User is NOT logged in.
 * • MainTabNavigator   -> User is logged in.
 *
 * The authentication state is managed using Redux.
 * ============================================================================
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

// Navigation Flows
import AuthStack from "./AuthStack";
import MainTabNavigator from "./MainTabNavigator";

/**
 * Root Navigator
 *
 * Switches between Authentication Flow
 * and Main Application Flow based on
 * the user's authentication status.
 */
export default function AppNavigator() {

  // Read authentication state from Redux Store
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainTabNavigator />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}