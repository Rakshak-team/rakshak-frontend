/**
 * ============================================================================
 * File: App.js
 * Path: App.js
 * ----------------------------------------------------------------------------
 * Description:
 * Root component of the Rakshak application.
 *
 * Responsibilities:
 * • Initialize the Redux Provider
 * • Configure Safe Area support
 * • Initialize authentication interceptor
 * • Launch the application's navigation flow
 * ============================================================================
 */

// ============================================================================
// Imports
// ============================================================================

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { store } from "./src/redux/store";
import { setupAuthInterceptor } from "./src/api/authInterceptor";
import AppNavigator from "./src/navigation/AppNavigator";

// ============================================================================
// App Component
// ============================================================================

export default function App() {

  /**
   * ==========================================================================
   * Initialize Global Axios Interceptors
   * ==========================================================================
   */
  useEffect(() => {

    setupAuthInterceptor(store);

  }, []);

  return (

    // Makes the Redux Store available throughout the application
    <Provider store={store}>

      {/* Handles device safe areas (notch, status bar, home indicator) */}
      <SafeAreaProvider>

        {/* Root Navigation */}
        <AppNavigator />

      </SafeAreaProvider>

    </Provider>

  );

}