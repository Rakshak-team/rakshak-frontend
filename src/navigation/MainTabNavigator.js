/**
 * ============================================================================
 * File: MainTabNavigator.js
 * Path: src/navigation/MainTabNavigator.js
 * ----------------------------------------------------------------------------
 * Description:
 * Handles the main bottom tab navigation after a user logs in.
 *
 * Tabs:
 * - Home
 * - Incidents
 * - Profile
 * - Settings
 * ============================================================================
 */

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Route Constants
import { ROUTES } from "./routes";

// Screens
import HomeScreen from "../screens/home/HomeScreen";
import IncidentsScreen from "../screens/incidents/IncidentsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

/**
 * Main Bottom Tab Navigation
 */
export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Hide default header
        headerShown: false,

        // Active Tab Color
        tabBarActiveTintColor: "#D32F2F",

        // Inactive Tab Color
        tabBarInactiveTintColor: "#757575",

        // Tab Bar Style
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },

        // Tab Icons
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case ROUTES.HOME:
              iconName = "home";
              break;

            case ROUTES.INCIDENTS:
              iconName = "file-document";
              break;

            case ROUTES.PROFILE:
              iconName = "account-circle";
              break;

            case ROUTES.SETTINGS:
              iconName = "cog";
              break;

            default:
              iconName = "circle";
          }

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
      />

      <Tab.Screen
        name={ROUTES.INCIDENTS}
        component={IncidentsScreen}
      />

      <Tab.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
      />

      <Tab.Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}