
/**
 * ============================================================================
 * File: ProfileScreen.js
 * ----------------------------------------------------------------------------
 * Description:
 * Profile screen of the Rakshak application.
 *
 * Responsibilities:
 * • Display logged-in user information
 * • Display profile image or placeholder
 * • Display personal information
 * • Display volunteer-specific information
 * • Display medical details for medical volunteers
 * • Display account status
 *
 * Notes:
 * • User information is retrieved from Redux
 * • No API calls
 * • Profile image upload is not implemented yet
 * ============================================================================
 */

// Imports
import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

import { useSelector } from "react-redux";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Theme
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../constants/theme";

// ============================================================================
// Profile Screen Component
// ============================================================================

const ProfileScreen = () => {

  // ==========================================================================
  // Redux User Data
  // ==========================================================================

  const user = useSelector((state) => state.auth.user);

  // ==========================================================================
  // Local UI State
  // ==========================================================================

  const [imageError, setImageError] = useState(false);

  // ==========================================================================
  // User Information
  // ==========================================================================

  const firstName = user?.firstName || "";

  const lastName = user?.lastName || "";

  const fullName =
    user?.fullName ||
    `${firstName} ${lastName}`.trim() ||
    "Rakshak Volunteer";

  const isMedicalVolunteer =
    user?.role === "MEDICAL_VOLUNTEER";

  const profileImageUrl = user?.profileImageUrl;

  // ==========================================================================
  // Helper Functions
  // ==========================================================================

  const formatValue = (value) => {

    if (value === null || value === undefined || value === "") {
      return "Not available";
    }

    return String(value);

  };

  const formatLabel = (value) => {

    if (!value) {
      return "Not available";
    }

    return String(value)
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

  };

  // ==========================================================================
  // Reusable Information Row
  // ==========================================================================

  const InfoRow = ({ label, value, icon }) => (

    <View style={styles.infoRow}>

      <View style={styles.infoIconContainer}>

        <MaterialCommunityIcons
          name={icon}
          size={22}
          color={COLORS.PRIMARY}
        />

      </View>

      <View style={styles.infoTextContainer}>

        <Text style={styles.infoLabel}>
          {label}
        </Text>

        <Text style={styles.infoValue}>
          {formatValue(value)}
        </Text>

      </View>

    </View>

  );

  // ==========================================================================
  // Reusable Section Header
  // ==========================================================================

  const SectionHeader = ({ title, icon }) => (

    <View style={styles.sectionHeader}>

      <MaterialCommunityIcons
        name={icon}
        size={22}
        color={COLORS.PRIMARY}
      />

      <Text style={styles.sectionTitle}>
        {title}
      </Text>

    </View>

  );

  // ==========================================================================
  // Render Profile Screen
  // ==========================================================================

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >

      {/* ==========================================================
          Profile Header
      ========================================================== */}

      <View style={styles.profileHeader}>

        <View style={styles.avatarContainer}>

          {profileImageUrl && !imageError ? (

            <Image
              source={{ uri: profileImageUrl }}
              style={styles.profileImage}
              onError={() => setImageError(true)}
            />

          ) : (

            <View style={styles.placeholderAvatar}>

              <MaterialCommunityIcons
                name="account"
                size={TYPOGRAPHY.FONT_SIZE.DISPLAY}
                color={COLORS.PRIMARY}
              />

            </View>

          )}

        </View>

        <Text style={styles.userName}>
          {fullName}
        </Text>

        <View style={styles.roleBadge}>

          <Text style={styles.roleText}>
            {formatLabel(user?.role)}
          </Text>

        </View>

      </View>

      {/* ==========================================================
          Personal Information
      ========================================================== */}

      <View style={styles.section}>

        <SectionHeader
          title="Personal Information"
          icon="account-details-outline"
        />

        <InfoRow
          label="First Name"
          value={user?.firstName}
          icon="account-outline"
        />

        <InfoRow
          label="Last Name"
          value={user?.lastName}
          icon="account-outline"
        />

        <InfoRow
          label="Email Address"
          value={user?.email}
          icon="email-outline"
        />

        <InfoRow
          label="Phone Number"
          value={user?.phoneNumber}
          icon="phone-outline"
        />

        <InfoRow
          label="Blood Group"
          value={user?.bloodGroup}
          icon="water-outline"
        />

      </View>

      {/* ==========================================================
          Medical Volunteer Information
          Visible Only For Medical Volunteers
      ========================================================== */}

      {isMedicalVolunteer && (

        <View style={styles.section}>

          <SectionHeader
            title="Medical Information"
            icon="medical-bag"
          />

          <InfoRow
            label="Medical Profession"
            value={user?.medicalProfession}
            icon="stethoscope"
          />

          <InfoRow
            label="Organization"
            value={user?.organization}
            icon="hospital-building"
          />

          <InfoRow
            label="Registration Number"
            value={user?.registrationNumber}
            icon="card-account-details-outline"
          />

        </View>

      )}

      {/* ==========================================================
          Account Information
      ========================================================== */}

      <View style={styles.section}>

        <SectionHeader
          title="Account Information"
          icon="shield-account-outline"
        />

        <InfoRow
          label="Account Status"
          value={formatLabel(user?.accountStatus)}
          icon="account-check-outline"
        />

      </View>

    </ScrollView>

  );

};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },

  contentContainer: {
    padding: SPACING.MD,
    paddingBottom: SPACING.XL,
  },

  // ==========================================================================
  // Profile Header
  // ==========================================================================

  profileHeader: {
    alignItems: "center",
    backgroundColor: COLORS.WHITE,
    paddingVertical: SPACING.XL,
    paddingHorizontal: SPACING.MD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    marginBottom: SPACING.LG,
  },

  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: "hidden",
    marginBottom: SPACING.MD,
  },

  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 55,
  },

  placeholderAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 55,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },

  userName: {
    fontSize: TYPOGRAPHY.FONT_SIZE.XL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
    textAlign: "center",
  },

  roleBadge: {
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },

  roleText: {
    fontSize: TYPOGRAPHY.FONT_SIZE.XS,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
    color: COLORS.PRIMARY,
  },

  // ==========================================================================
  // Information Sections
  // ==========================================================================

  section: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: SPACING.MD,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    marginBottom: SPACING.LG,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.SM,
    marginBottom: SPACING.MD,
  },

  sectionTitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE.LG,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
    color: COLORS.TEXT_PRIMARY,
  },

  // ==========================================================================
  // Information Rows
  // ==========================================================================

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.MD,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
  },

  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.MD,
  },

  infoTextContainer: {
    flex: 1,
  },

  infoLabel: {
    fontSize: TYPOGRAPHY.FONT_SIZE.XS,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XS,
  },

  infoValue: {
    fontSize: TYPOGRAPHY.FONT_SIZE.MD,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
    color: COLORS.TEXT_PRIMARY,
  },

});

export default ProfileScreen;
