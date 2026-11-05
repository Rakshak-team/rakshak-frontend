
/**
 * ============================================================================
 * File: HomeScreen.js
 * Path: src/screens/home/HomeScreen.js
 * ----------------------------------------------------------------------------
 * Description:
 * Main home screen of the Rakshak application.
 *
 * Responsibilities:
 * • Display the user's current GPS location
 * • Display GPS accuracy
 * • Allow users to refresh their current location
 * • Provide access to incident reporting
 *
 * Notes:
 * • Uses the centralized LocationService
 * • Does not handle location permissions directly
 * • Does not communicate with the backend
 * ============================================================================
 */

// Imports
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Reusable Components
import AppScreen from "../../components/ui/AppScreen";

// Services
import LocationService from "../../services/location/locationService";

// Theme
import {
  COLORS,
  SPACING,
} from "../../constants/theme";

// ============================================================================
// Home Screen Component
// ============================================================================

const HomeScreen = ({ navigation }) => {

  // ==========================================================================
  // Component State
  // ==========================================================================

  const [location, setLocation] = useState(null);

  const [loading, setLoading] = useState(true);

  const [locationError, setLocationError] = useState(null);

  // Track whether the screen is still mounted
  const isMounted = useRef(true);

  // ==========================================================================
  // Fetch Current Location
  // ==========================================================================

  const fetchCurrentLocation = useCallback(async () => {

    try {

      // Start location loading
      setLoading(true);

      setLocationError(null);

      // Fetch GPS coordinates
      const currentLocation =
        await LocationService.getCurrentLocation();

      // Update location if screen is still mounted
      if (isMounted.current) {

        setLocation(currentLocation);

      }

    } catch (error) {

      // Handle location fetching failure
      if (isMounted.current) {

        setLocationError(
          error.message || "Unable to fetch current location."
        );

      }

    } finally {

      // Stop loading indicator
      if (isMounted.current) {

        setLoading(false);

      }

    }

  }, []);

  // ==========================================================================
  // Screen Initialization
  // ==========================================================================

  useEffect(() => {

    isMounted.current = true;

    // Fetch location when Home Screen opens
    fetchCurrentLocation();

    return () => {

      isMounted.current = false;

    };

  }, [fetchCurrentLocation]);

  // ==========================================================================
  // Incident Reporting Navigation
  // ==========================================================================

  const handleReportIncident = () => {

    navigation.navigate("ReportIncident");

  };

  // ==========================================================================
  // Location Display
  // ==========================================================================

  const renderLocationDetails = () => {

    // Loading State
    if (loading) {

      return (

        <View style={styles.statusContainer}>

          <ActivityIndicator
            size="small"
            color={COLORS.PRIMARY}
          />

          <Text style={styles.statusText}>
            Fetching your current location...
          </Text>

        </View>

      );

    }

    // Error State
    if (locationError) {

      return (

        <View style={styles.statusContainer}>

          <MaterialCommunityIcons
            name="map-marker-alert-outline"
            size={28}
            color={COLORS.ERROR}
          />

          <Text style={styles.errorText}>
            {locationError}
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            activeOpacity={0.8}
            onPress={fetchCurrentLocation}
          >

            <MaterialCommunityIcons
              name="refresh"
              size={18}
              color={COLORS.WHITE}
            />

            <Text style={styles.retryButtonText}>
              Retry Location
            </Text>

          </TouchableOpacity>

        </View>

      );

    }

    // Location Not Available
    if (!location) {
      return null;
    }

    // Successfully Fetched Location
    return (

      <View style={styles.coordinatesContainer}>

        <View style={styles.coordinateRow}>

          <Text style={styles.coordinateLabel}>
            Latitude
          </Text>

          <Text style={styles.coordinateValue}>
            {location.latitude.toFixed(6)}
          </Text>

        </View>

        <View style={styles.coordinateRow}>

          <Text style={styles.coordinateLabel}>
            Longitude
          </Text>

          <Text style={styles.coordinateValue}>
            {location.longitude.toFixed(6)}
          </Text>

        </View>

        <View style={styles.accuracyContainer}>

          <MaterialCommunityIcons
            name="crosshairs-gps"
            size={18}
            color={COLORS.SUCCESS}
          />

          <Text style={styles.accuracyText}>
            GPS Accuracy: {Math.round(location.accuracy)} metres
          </Text>

        </View>

      </View>

    );

  };

  // ==========================================================================
  // Render Home Screen
  // ==========================================================================

  return (

    <AppScreen>

      <View style={styles.container}>

        {/* ================================================================
            Header Section
        ================================================================ */}

        <View style={styles.header}>

          <View>

            <Text style={styles.appTitle}>
              Rakshak
            </Text>

            <Text style={styles.headerSubtitle}>
              Your neighbourhood safety network
            </Text>

          </View>

          <MaterialCommunityIcons
            name="shield-check"
            size={34}
            color={COLORS.PRIMARY}
          />

        </View>

        {/* ================================================================
            Current Location Section
        ================================================================ */}

        <View style={styles.locationCard}>

          <View style={styles.sectionHeader}>

            <View style={styles.sectionTitleContainer}>

              <MaterialCommunityIcons
                name="map-marker"
                size={23}
                color={COLORS.PRIMARY}
              />

              <Text style={styles.sectionTitle}>
                Current Location
              </Text>

            </View>

            <TouchableOpacity
              onPress={fetchCurrentLocation}
              disabled={loading}
              activeOpacity={0.7}
              accessibilityLabel="Refresh current location"
            >

              <MaterialCommunityIcons
                name="refresh"
                size={23}
                color={
                  loading
                    ? COLORS.TEXT_DISABLED
                    : COLORS.PRIMARY
                }
              />

            </TouchableOpacity>

          </View>

          {renderLocationDetails()}

        </View>

        {/* ================================================================
            Incident Reporting Section
        ================================================================ */}

        <View style={styles.reportSection}>

          <Text style={styles.reportHeading}>
            Need Help?
          </Text>

          <Text style={styles.reportDescription}>
            Report a road accident and help nearby volunteers
            respond to the situation.
          </Text>

          <TouchableOpacity
            style={styles.reportButton}
            activeOpacity={0.85}
            onPress={handleReportIncident}
          >

            <MaterialCommunityIcons
              name="camera"
              size={26}
              color={COLORS.WHITE}
            />

            <View style={styles.reportButtonTextContainer}>

              <Text style={styles.reportButtonTitle}>
                Report Incident
              </Text>

              <Text style={styles.reportButtonSubtitle}>
                Capture an accident photo
              </Text>

            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              size={28}
              color={COLORS.WHITE}
            />

          </TouchableOpacity>

        </View>

      </View>

    </AppScreen>

  );

};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: SPACING.LG,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.XL,
  },

  appTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.PRIMARY,
  },

  headerSubtitle: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.XS,
  },

  // Location Card
  locationCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: SPACING.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    marginBottom: SPACING.XL,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.MD,
  },

  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.SM,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.TEXT_PRIMARY,
  },

  // Location Status
  statusContainer: {
    alignItems: "center",
    paddingVertical: SPACING.LG,
    gap: SPACING.SM,
  },

  statusText: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    textAlign: "center",
  },

  errorText: {
    fontSize: 14,
    color: COLORS.ERROR,
    textAlign: "center",
  },

  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    borderRadius: 8,
    gap: SPACING.SM,
  },

  retryButtonText: {
    color: COLORS.WHITE,
    fontWeight: "600",
    fontSize: 13,
  },

  // Coordinates
  coordinatesContainer: {
    gap: SPACING.MD,
  },

  coordinateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  coordinateLabel: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
  },

  coordinateValue: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },

  accuracyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: SPACING.SM,
    borderRadius: 8,
    gap: SPACING.SM,
  },

  accuracyText: {
    fontSize: 13,
    color: COLORS.SUCCESS,
    fontWeight: "600",
  },

  // Incident Reporting
  reportSection: {
    marginTop: SPACING.SM,
  },

  reportHeading: {
    fontSize: 21,
    fontWeight: "700",
    color: COLORS.TEXT_PRIMARY,
  },

  reportDescription: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 21,
    marginTop: SPACING.SM,
    marginBottom: SPACING.LG,
  },

  reportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
    padding: SPACING.LG,
    borderRadius: 16,
    gap: SPACING.MD,
  },

  reportButtonTextContainer: {
    flex: 1,
  },

  reportButtonTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.WHITE,
  },

  reportButtonSubtitle: {
    fontSize: 13,
    color: COLORS.WHITE,
    marginTop: SPACING.XS,
  },

});

export default HomeScreen;
