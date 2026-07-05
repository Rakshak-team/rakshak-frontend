import React from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { store } from "./src/redux/store";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    // Makes the Redux Store available throughout the application
    <Provider store={store}>
      {/* Handles safe areas like notches, status bar, etc. */}
      <SafeAreaProvider>
        {/* Entry point of the application */}
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}