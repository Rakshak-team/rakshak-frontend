/**
 * ============================================================================
 * File: PermissionScreen.js
 * Path: src/screens/permissions/PermissionScreen.js
 * ----------------------------------------------------------------------------
 * Description:
 * Requests all mandatory permissions required by Rakshak before
 * allowing the user to continue.
 *
 * Responsibilities:
 * • Request all mandatory permissions
 * • Handle denied and blocked permissions
 * • Navigate to Startup Screen
 * ============================================================================
 */

// Imports
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';

import { RESULTS } from 'react-native-permissions';

import PermissionService from '../../services/permissions/permissionService';
import { ROUTES } from '../../navigation/routes';

// Permission Screen Component
const PermissionScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializePermissions();
  }, []);

  // Check and request the required permissions
  const initializePermissions = async () => {
    try {
      // Check if all required permissions are already granted
      const hasPermissions =
        await PermissionService.hasAllRequiredPermissions();

      // Skip permission requests if everything is already granted
      if (hasPermissions) {
        navigation.replace(ROUTES.STARTUP);
        return;
      }

      // Request only the missing permissions
      const permissionResult = await PermissionService.requestAllPermissions();

      // Continue if every permission is granted
      if (permissionResult.granted) {
        navigation.replace(ROUTES.STARTUP);
        return;
      }

      // Show settings dialog if any permission is permanently blocked
      if (
        permissionResult.camera === RESULTS.BLOCKED ||
        permissionResult.location === RESULTS.BLOCKED ||
        permissionResult.notification === RESULTS.BLOCKED
      ) {
        Alert.alert(
          'Permissions Required',
          'Some permissions are permanently denied. Please enable them from Settings.',
          [
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
        );

        return;
      }

      // User denied one or more permissions
      Alert.alert(
        'Permissions Required',
        'Rakshak requires Camera, Location and Notification permissions to continue.',
      );
    } catch (error) {
      Alert.alert('Permission Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setting Up Rakshak</Text>

      <Text style={styles.subtitle}>
        Please grant the required permissions to continue.
      </Text>

      {loading && <ActivityIndicator size="large" color="#D32F2F" />}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },

  // Screen title
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 12,
  },

  // Screen description
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 24,
  },
});

export default PermissionScreen;
