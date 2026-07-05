/**
 * ============================================================================
 * File: HomeScreen.js
 * Path: src/screens/home/HomeScreen.js
 * ----------------------------------------------------------------------------
 * Description:
 * Home screen of the Rakshak application.
 *
 * Allows users to:
 * • View their current location.
 * • Report a new incident.
 *
 * Tapping "Report Incident" will open the device camera.
 * ============================================================================
 */

import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {

  /**
   * Opens the device camera.
   *
   * Camera functionality will be implemented
   * in a later phase.
   */
  const handleReportIncident = () => {
    console.log("Open Camera");
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Current Location Section */}
      <View style={styles.locationContainer}>
        <Text style={styles.heading}>
          Current Location
        </Text>

        <Text style={styles.locationText}>
          Fetching location...
        </Text>
      </View>

      {/* Report Incident Card */}
      <TouchableOpacity
        style={styles.reportCard}
        activeOpacity={0.8}
        onPress={handleReportIncident}
      >
        <Text style={styles.reportTitle}>
          📷 Report Incident
        </Text>

        <Text style={styles.reportSubtitle}>
          Tap to open the camera
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

  locationContainer: {
    marginTop: 20,
    marginBottom: 30,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#212121",
  },

  locationText: {
    marginTop: 8,
    fontSize: 16,
    color: "#616161",
  },

  reportCard: {
    backgroundColor: "#D32F2F",
    borderRadius: 16,
    padding: 20,
  },

  reportTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  reportSubtitle: {
    color: "#FFFFFF",
    marginTop: 8,
    fontSize: 15,
  },

});