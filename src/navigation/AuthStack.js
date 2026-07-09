/**
 * ============================================================================
 * File: AuthStack.js
 * Path: src/navigation/AuthStack.js
 * ----------------------------------------------------------------------------
 * Description:
 * Handles the authentication flow of the Rakshak application.
 *
 * Responsibilities:
 * • Display Welcome screen
 * • Navigate to Login and Register screens
 * • Manage authentication related navigation
 * ============================================================================
 */

// Imports
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../constants/theme';
// Route constants
import { ROUTES } from './routes';

// Authentication Screens
import WelcomeScreen from '../screens/auth/Welcome/WelcomeScreen';
import LoginScreen from '../screens/auth/Login/LoginScreen';
import RegisterScreen from '../screens/auth/Register';

// Create Native Stack Navigator
const Stack = createNativeStackNavigator();

// Authentication Stack
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.WELCOME}
      screenOptions={{
        // Hide the default navigation header
        headerShown: false,

        // Screen transition animation
        animation: 'slide_from_right',

        // Background color during screen transitions
        contentStyle: {
          backgroundColor: COLORS.BACKGROUND,
        },
      }}
    >
      {/* Welcome Screen */}
      <Stack.Screen name={ROUTES.WELCOME} component={WelcomeScreen} />

      {/* Login Screen */}
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />

      {/* Register Screen */}
      <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
