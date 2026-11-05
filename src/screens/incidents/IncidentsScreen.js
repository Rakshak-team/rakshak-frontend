
/**
 * ============================================================================
 * File: IncidentsScreen.js
 * Path: src/screens/incidents/IncidentsScreen.js
 * ----------------------------------------------------------------------------
 * Description:
 * Displays incidents reported by the currently authenticated user.
 *
 * Responsibilities:
 * • Fetch user's reported incidents from the backend
 * • Display incident photographs and descriptions
 * • Display incident severity and status
 * • Navigate to incident details
 * • Support pull-to-refresh
 * • Handle loading, empty and error states
 *
 * Notes:
 * • Uses GET /incidents/my endpoint
 * • Automatically refreshes whenever the screen receives focus
 * • Does not contain backend business logic
 * ============================================================================
 */

// Imports
import React, {
  useCallback,
  useState,
  useRef,
} from "react";

import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { getMyIncidents } from "../../api";

import AppScreen from "../../components/ui/AppScreen";

import { ROUTES } from "../../navigation/routes";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  BORDER_RADIUS,
} from "../../constants/theme";

// ============================================================================
// Incidents Screen
// ============================================================================

const IncidentsScreen = ({ navigation }) => {

  // ==========================================================================
  // State Management
  // ==========================================================================

  const [incidents, setIncidents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const hasLoadedRef = useRef(false);

  // ==========================================================================
  // Fetch My Incidents
  // ==========================================================================

  const fetchIncidents = useCallback(async (isRefresh = false) => {

    if (isRefresh) {
      setRefreshing(true);
    } else if (!hasLoadedRef.current) {
      setLoading(true);
    }

    setError("");

    try {

      const response = await getMyIncidents();

      const incidentData = response?.data;

      if (!Array.isArray(incidentData)) {
        throw new Error("Invalid incidents response received.");
      }

      setIncidents(incidentData);

      hasLoadedRef.current = true;

    } catch (err) {

      console.error(
        "Fetch Incidents Error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
        "Unable to load incidents. Please try again."
      );

    } finally {

      setLoading(false);
      setRefreshing(false);

    }

  }, []);

  // ==========================================================================
  // Refresh Screen Whenever It Receives Focus
  // ==========================================================================

  useFocusEffect(
    useCallback(() => {

      fetchIncidents();

    }, [fetchIncidents])
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
  // Open Incident Details
  // ==========================================================================

  const openIncidentDetails = (incidentId) => {

    navigation.navigate(ROUTES.INCIDENT_DETAILS, {
      incidentId: incidentId,
    });

  };

  // ==========================================================================
  // Render Incident Card
  // ==========================================================================

  const renderIncident = ({ item }) => {

    const severityColor = getSeverityColor(item.severity);
    const statusColor = getStatusColor(item.status);

    return (

      <TouchableOpacity
        style={styles.incidentCard}
        onPress={() => openIncidentDetails(item.incidentId)}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={`View details for incident ${item.incidentId}`}
      >

        {/* Incident Image */}

        {item.imageUrl ? (

          <Image
            source={{ uri: item.imageUrl }}
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

        {/* Incident Information */}

        <View style={styles.cardContent}>

          <Text style={styles.incidentId}>
            Incident #{item.incidentId}
          </Text>

          <Text
            style={styles.description}
            numberOfLines={3}
          >
            {item.description?.trim() ||
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
                {formatLabel(item.severity)}
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
                {formatLabel(item.status)}
              </Text>

            </View>

          </View>

          {/* Location */}

          {Number.isFinite(item.latitude) &&
            Number.isFinite(item.longitude) && (

              <Text style={styles.locationText}>
                Location: {item.latitude.toFixed(4)},{" "}
                {item.longitude.toFixed(4)}
              </Text>

            )}

          {/* View Details Hint */}

          <Text style={styles.viewDetailsText}>
            Tap to view full details →
          </Text>

        </View>

      </TouchableOpacity>

    );

  };

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
            Loading your incidents...
          </Text>

        </View>

      </AppScreen>

    );

  }

  // ==========================================================================
  // Error State
  // ==========================================================================

  if (error && incidents.length === 0) {

    return (

      <AppScreen>

        <View style={styles.centerContainer}>

          <Text style={styles.stateTitle}>
            Unable to Load Incidents
          </Text>

          <Text style={styles.stateText}>
            {error}
          </Text>

          <TouchableOpacity
            onPress={() => fetchIncidents()}
            accessibilityRole="button"
          >

            <Text style={styles.retryText}>
              Tap here to retry
            </Text>

          </TouchableOpacity>

        </View>

      </AppScreen>

    );

  }

  // ==========================================================================
  // Main Screen
  // ==========================================================================

  return (

    <AppScreen padded={false}>

      <FlatList

        data={incidents}

        keyExtractor={(item) =>
          String(item.incidentId)
        }

        renderItem={renderIncident}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={[
          styles.listContent,
          incidents.length === 0 && styles.emptyListContent,
        ]}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchIncidents(true)}
            colors={[COLORS.PRIMARY]}
            tintColor={COLORS.PRIMARY}
          />
        }

        ListHeaderComponent={

          <View style={styles.header}>

            <Text style={styles.screenTitle}>
              My Incidents
            </Text>

            <Text style={styles.screenSubtitle}>
              Accidents reported by you
            </Text>

          </View>

        }

        ListEmptyComponent={

          <View style={styles.centerContainer}>

            <Text style={styles.emptyTitle}>
              No Incidents Yet
            </Text>

            <Text style={styles.stateText}>
              Your reported incidents will appear here.
            </Text>

          </View>

        }

        ListFooterComponent={

          error ? (

            <Text style={styles.footerError}>
              {error} Pull down to retry.
            </Text>

          ) : null

        }

      />

    </AppScreen>

  );

};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({

  // Main Header

  header: {
    paddingHorizontal: SPACING.LG,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.MD,
  },

  screenTitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE?.XL || 24,
    fontWeight: "700",
    color: COLORS.TEXT_PRIMARY,
  },

  screenSubtitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE?.SM || 14,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.XS,
  },

  // Incident List

  listContent: {
    paddingBottom: SPACING.XXL,
  },

  emptyListContent: {
    flexGrow: 1,
  },

  incidentCard: {
    marginHorizontal: SPACING.LG,
    marginBottom: SPACING.MD,
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    overflow: "hidden",
  },

  // Incident Image

  incidentImage: {
    width: "100%",
    height: 190,
    backgroundColor: COLORS.BACKGROUND,
  },

  imagePlaceholder: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.BACKGROUND,
  },

  placeholderText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 13,
  },

  // Card Content

  cardContent: {
    padding: SPACING.MD,
  },

  incidentId: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.SM,
  },

  description: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 22,
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

  // Location

  locationText: {
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.MD,
  },

  // View Details

  viewDetailsText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.PRIMARY,
    marginTop: SPACING.MD,
    textAlign: "right",
  },

  // Loading, Error and Empty States

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.XL,
  },

  stateTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
    textAlign: "center",
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },

  stateText: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    textAlign: "center",
    marginTop: SPACING.MD,
    lineHeight: 21,
  },

  retryText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.PRIMARY,
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

export default IncidentsScreen;
