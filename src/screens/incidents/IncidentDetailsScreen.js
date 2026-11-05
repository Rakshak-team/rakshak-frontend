
/**
 * ============================================================================
 * File: IncidentDetailsScreen.js
 * Path: src/screens/incidents/IncidentDetailsScreen.js
 * ----------------------------------------------------------------------------
 * Description:
 * Displays complete information about a selected incident.
 *
 * Responsibilities:
 * • Fetch incident details using incident ID
 * • Display incident photograph and description
 * • Display severity and current status
 * • Display location coordinates
 * • Display AI analysis and volunteer requirements
 * • Handle loading, error and retry states
 *
 * Notes:
 * • Uses GET /incidents/{id}
 * • Receives incidentId through navigation route parameters
 * • Does not contain backend business logic
 * ============================================================================
 */

// Imports
import React, {
  useCallback,
  useState,
} from "react";

import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { getIncidentById } from "../../api";

import AppScreen from "../../components/ui/AppScreen";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  BORDER_RADIUS,
} from "../../constants/theme";

// ============================================================================
// Incident Details Screen
// ============================================================================

const IncidentDetailsScreen = ({ route, navigation }) => {

  // ==========================================================================
  // Route Parameters
  // ==========================================================================

  const { incidentId } = route.params || {};

  // ==========================================================================
  // State Management
  // ==========================================================================

  const [incident, setIncident] = useState(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  // ==========================================================================
  // Fetch Incident Details
  // ==========================================================================

  const fetchIncidentDetails = useCallback(async (isRefresh = false) => {

    if (!incidentId) {
      setError("Incident ID is missing.");
      setLoading(false);
      return;
    }

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {

      const response = await getIncidentById(incidentId);

      setIncident(response?.data || null);

      if (!response?.data) {
        throw new Error("Incident details not found.");
      }

    } catch (err) {

      console.error(
        "Fetch Incident Details Error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
        "Unable to load incident details. Please try again."
      );

    } finally {

      setLoading(false);
      setRefreshing(false);

    }

  }, [incidentId]);

  // ==========================================================================
  // Refresh Details Whenever Screen Receives Focus
  // ==========================================================================

  useFocusEffect(
    useCallback(() => {

      fetchIncidentDetails();

    }, [fetchIncidentDetails])
  );

  // ==========================================================================
  // Format Display Values
  // ==========================================================================

  const formatLabel = (value) => {

    if (!value) {
      return "Not Available";
    }

    return String(value)
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

  };

  // ==========================================================================
  // Severity Color
  // ==========================================================================

  const getSeverityColor = (severity) => {

    switch (String(severity || "").toUpperCase()) {

      case "HIGH":
      case "CRITICAL":
        return COLORS.ERROR;

      case "MEDIUM":
        return COLORS.WARNING;

      case "LOW":
        return COLORS.SUCCESS;

      default:
        return COLORS.TEXT_SECONDARY;

    }

  };

  // ==========================================================================
  // Status Color
  // ==========================================================================

  const getStatusColor = (status) => {

    switch (String(status || "").toUpperCase()) {

      case "RESOLVED":
        return COLORS.SUCCESS;

      case "IN_PROGRESS":
        return COLORS.WARNING;

      case "REPORTED":
        return COLORS.PRIMARY;

      default:
        return COLORS.TEXT_SECONDARY;

    }

  };

  // ==========================================================================
  // Detail Information Row
  // ==========================================================================

  const renderDetailRow = (label, value) => (

    <View style={styles.detailRow}>

      <Text style={styles.detailLabel}>
        {label}
      </Text>

      <Text style={styles.detailValue}>
        {value ?? "Not Available"}
      </Text>

    </View>

  );

  // ==========================================================================
  // Loading State
  // ==========================================================================

  if (loading) {

    return (

      <AppScreen>

        <View style={styles.centerContainer}>

          <ActivityIndicator
            size="large"
            color={COLORS.PRIMARY}
          />

          <Text style={styles.stateText}>
            Loading incident details...
          </Text>

        </View>

      </AppScreen>

    );

  }

  // ==========================================================================
  // Error State
  // ==========================================================================

  if (error && !incident) {

    return (

      <AppScreen>

        <View style={styles.centerContainer}>

          <Text style={styles.stateTitle}>
            Unable to Load Incident
          </Text>

          <Text style={styles.stateText}>
            {error}
          </Text>

          <TouchableOpacity
            onPress={() => fetchIncidentDetails()}
            accessibilityRole="button"
            style={styles.retryButton}
          >

            <Text style={styles.retryText}>
              Try Again
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
          >

            <Text style={styles.backText}>
              Go Back
            </Text>

          </TouchableOpacity>

        </View>

      </AppScreen>

    );

  }

  // ==========================================================================
  // Incident Data
  // ==========================================================================

  const severityColor = getSeverityColor(incident?.severity);

  const statusColor = getStatusColor(incident?.status);

  // ==========================================================================
  // Main Screen
  // ==========================================================================

  return (

    <AppScreen padded={false}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchIncidentDetails(true)}
            colors={[COLORS.PRIMARY]}
            tintColor={COLORS.PRIMARY}
          />
        }
        contentContainerStyle={styles.scrollContent}
      >

        {/* ==================================================================
            Header
        ================================================================== */}

        <View style={styles.header}>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            style={styles.backButton}
          >

            <Text style={styles.backButtonText}>
              {"<  Back"}
            </Text>

          </TouchableOpacity>

          <Text style={styles.screenTitle}>
            Incident Details
          </Text>

          <Text style={styles.screenSubtitle}>
            Complete information about this incident
          </Text>

        </View>

        {/* ==================================================================
            Incident Photograph
        ================================================================== */}

        {incident.imageUrl ? (

          <Image
            source={{ uri: incident.imageUrl }}
            style={styles.incidentImage}
            resizeMode="cover"
          />

        ) : (

          <View style={styles.imagePlaceholder}>

            <Text style={styles.placeholderText}>
              No Image Available
            </Text>

          </View>

        )}

        {/* ==================================================================
            Basic Information
        ================================================================== */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Incident Information
          </Text>

          <Text style={styles.incidentId}>
            Incident #{incident.incidentId}
          </Text>

          <Text style={styles.description}>
            {incident.description?.trim() ||
              "No description provided."}
          </Text>

          {/* Severity and Status */}

          <View style={styles.badgeContainer}>

            <View
              style={[
                styles.badge,
                {
                  backgroundColor: severityColor + "18",
                },
              ]}
            >

              <Text
                style={[
                  styles.badgeText,
                  { color: severityColor },
                ]}
              >
                {formatLabel(incident.severity)}
              </Text>

            </View>

            <View
              style={[
                styles.badge,
                {
                  backgroundColor: statusColor + "18",
                },
              ]}
            >

              <Text
                style={[
                  styles.badgeText,
                  { color: statusColor },
                ]}
              >
                {formatLabel(incident.status)}
              </Text>

            </View>

          </View>

        </View>

        {/* ==================================================================
            Location Information
        ================================================================== */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Location Information
          </Text>

          {renderDetailRow(
            "Latitude",
            incident.latitude
          )}

          {renderDetailRow(
            "Longitude",
            incident.longitude
          )}

        </View>

        {/* ==================================================================
            AI Analysis
        ================================================================== */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            AI Analysis
          </Text>

          <Text style={styles.analysisText}>
            {incident.aiAnalysis?.trim() ||
              "AI analysis is currently unavailable."}
          </Text>

        </View>

        {/* ==================================================================
            Volunteer Requirements
        ================================================================== */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Volunteer Requirements
          </Text>

          {renderDetailRow(
            "Estimated Volunteers",
            incident.estimatedVolunteers ?? "Not Available"
          )}

          {renderDetailRow(
            "Medical Assistance Required",
            incident.medicalRequired === true
              ? "Yes"
              : incident.medicalRequired === false
                ? "No"
                : "Not Available"
          )}

        </View>

        {/* ==================================================================
            Backend Message (If Available)
        ================================================================== */}

        {incident.message ? (

          <View style={styles.messageContainer}>

            <Text style={styles.messageText}>
              {incident.message}
            </Text>

          </View>

        ) : null}

      </ScrollView>

      {/* ====================================================================
          Refresh Error
      ==================================================================== */}

      {error ? (

        <Text style={styles.footerError}>
          {error}
        </Text>

      ) : null}

    </AppScreen>

  );

};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({

  // Main Layout

  scrollContent: {
    paddingBottom: SPACING.XXL,
  },

  header: {
    paddingHorizontal: SPACING.LG,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.MD,
  },

  screenTitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE?.XL || 24,
    fontWeight: "700",
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.MD,
  },

  screenSubtitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE?.SM || 14,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.XS,
  },

  backButton: {
    alignSelf: "flex-start",
    paddingVertical: SPACING.XS,
  },

  backButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 15,
    fontWeight: "600",
  },

  // Incident Image

  incidentImage: {
    width: "100%",
    height: 240,
    backgroundColor: COLORS.BACKGROUND,
  },

  imagePlaceholder: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
  },

  placeholderText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 14,
  },

  // Information Sections

  section: {
    marginHorizontal: SPACING.LG,
    marginTop: SPACING.LG,
    padding: SPACING.MD,
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },

  incidentId: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.SM,
  },

  description: {
    fontSize: 15,
    lineHeight: 23,
    color: COLORS.TEXT_PRIMARY,
  },

  // Badges

  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.SM,
    marginTop: SPACING.MD,
  },

  badge: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.MD,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },

  // Detail Rows

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: SPACING.SM,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },

  detailLabel: {
    flex: 1,
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
    marginRight: SPACING.MD,
  },

  detailValue: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "right",
  },

  // AI Analysis

  analysisText: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.TEXT_SECONDARY,
  },

  // Backend Message

  messageContainer: {
    marginHorizontal: SPACING.LG,
    marginTop: SPACING.MD,
    padding: SPACING.MD,
    borderRadius: BORDER_RADIUS.MD,
    backgroundColor: COLORS.BACKGROUND,
  },

  messageText: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 20,
  },

  // Loading and Error States

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.XL,
  },

  stateTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: COLORS.TEXT_PRIMARY,
    textAlign: "center",
  },

  stateText: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    textAlign: "center",
    marginTop: SPACING.MD,
    lineHeight: 21,
  },

  retryButton: {
    marginTop: SPACING.LG,
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.MD,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.MD,
  },

  retryText: {
    color: COLORS.WHITE,
    fontWeight: "700",
    fontSize: 14,
  },

  backText: {
    color: COLORS.PRIMARY,
    fontWeight: "600",
    fontSize: 14,
    marginTop: SPACING.LG,
  },

  footerError: {
    textAlign: "center",
    color: COLORS.ERROR,
    padding: SPACING.MD,
    fontSize: 13,
  },

});

// ============================================================================
// Export
// ============================================================================

export default IncidentDetailsScreen;
