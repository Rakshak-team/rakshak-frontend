/**
 * ============================================================================
 * File: MainTabNavigator.js
 * Path: src/navigation/MainTabNavigator.js
 * ----------------------------------------------------------------------------
 * Description:
 * Handles the main bottom tab navigation of the Rakshak application.
 *
 * Responsibilities:
 * • Display the main application tabs
 * • Configure bottom tab navigation
 * • Display tab icons
 * ============================================================================
 */

// Imports
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

// Main Bottom Tab Navigator
const MainTabNavigator = () => {

  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({

        // Hide the default navigation header
        headerShown: false,

        // Bottom tab colors
        tabBarActiveTintColor: "#D32F2F",
        tabBarInactiveTintColor: "#757575",

        // Bottom tab styling
        tabBarStyle: {
          height: 65,
          paddingTop: 8,
          paddingBottom: 8,
        },

        // Display icons for each tab
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

      {/* Home Tab */}
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
      />

      {/* Incidents Tab */}
      <Tab.Screen
        name={ROUTES.INCIDENTS}
        component={IncidentsScreen}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
      />

      {/* Settings Tab */}
      <Tab.Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
      />

    </Tab.Navigator>

  );

};

export default MainTabNavigator;