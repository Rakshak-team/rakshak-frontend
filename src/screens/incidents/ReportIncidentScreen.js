
/**
 * ============================================================================
 * File: ReportIncidentScreen.js
 * Path: src/screens/incidents/ReportIncidentScreen.js
 * ----------------------------------------------------------------------------
 * Description:
 * Screen responsible for capturing and submitting road accident reports.
 *
 * Responsibilities:
 * • Open device camera for incident photo capture
 * • Display captured incident photo
 * • Allow users to retake incident photos
 * • Fetch and display current GPS location
 * • Allow users to enter an optional incident description
 * • Upload incident photographs to Cloudinary
 * • Submit incident details to the backend
 * • Handle camera, location and submission errors
 *
 * Notes:
 * • Only device camera capture is supported
 * • Gallery uploads are not permitted
 * • Uses centralized CameraService and LocationService
 * • Uses centralized Incident APIs
 * • Description is optional
 * ============================================================================
 */

// Imports
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { RESULTS } from 'react-native-permissions';

// Reusable Components
import {
  AppScreen,
  AppButton,
  AppInput,
  AppSnackbar,
} from '../../components/ui';

// API
import {
  uploadIncidentImage,
  reportIncident,
} from '../../api';

// Services
import CameraService from '../../services/camera/cameraService';
import LocationService from '../../services/location/locationService';
import PermissionService from '../../services/permissions/permissionService';

// Theme
import { COLORS, SPACING } from '../../constants/theme';

// ============================================================================
// Report Incident Screen Component
// ============================================================================

const ReportIncidentScreen = ({ navigation }) => {

  // ==========================================================================
  // Component State
  // ==========================================================================

  // Captured incident photo
  const [incidentImage, setIncidentImage] = useState(null);

  // Optional incident description
  const [description, setDescription] = useState('');

  // Current GPS location
  const [location, setLocation] = useState(null);

  // Camera loading state
  const [cameraLoading, setCameraLoading] = useState(false);

  // Location loading state
  const [locationLoading, setLocationLoading] = useState(true);

  // Incident submission loading state
  const [submissionLoading, setSubmissionLoading] = useState(false);

  // Uploaded incident image URL
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  // Location error
  const [locationError, setLocationError] = useState(null);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    type: 'info',
  });

  // ==========================================================================
  // References
  // ==========================================================================

  // Track component mounting status
  const isMounted = useRef(true);

  // Prevent multiple simultaneous camera launches
  const cameraRequestInProgress = useRef(false);

  // Prevent multiple simultaneous location requests
  const locationRequestInProgress = useRef(false);

  // Prevent duplicate incident submissions
  const submissionInProgress = useRef(false);

  // ==========================================================================
  // Snackbar Management
  // ==========================================================================

  const showSnackbar = useCallback((message, type = 'info') => {

    setSnackbar({
      visible: true,
      message,
      type,
    });

  }, []);

  const dismissSnackbar = useCallback(() => {

    setSnackbar(previous => ({
      ...previous,
      visible: false,
    }));

  }, []);

  // ==========================================================================
  // Fetch Current Location
  // ==========================================================================

  const fetchCurrentLocation = useCallback(async () => {

    if (locationRequestInProgress.current) {
      return;
    }

    locationRequestInProgress.current = true;

    try {

      if (isMounted.current) {
        setLocationLoading(true);
        setLocationError(null);
      }

      // Fetch current GPS coordinates
      const currentLocation =
        await LocationService.getCurrentLocation();

      if (isMounted.current) {
        setLocation(currentLocation);
      }

    } catch (error) {

      if (isMounted.current) {
        setLocationError(
          error.message || 'Unable to fetch current location.'
        );
      }

    } finally {

      locationRequestInProgress.current = false;

      if (isMounted.current) {
        setLocationLoading(false);
      }

    }

  }, []);

  // ==========================================================================
  // Camera Permission Handling
  // ==========================================================================

  const verifyCameraPermission = async () => {

    // Check existing camera permission
    let permission =
      await PermissionService.checkCameraPermission();

    // Permission already granted
    if (permission === RESULTS.GRANTED) {
      return true;
    }

    // Permission permanently blocked
    if (permission === RESULTS.BLOCKED) {

      Alert.alert(
        'Camera Permission Required',
        'Please enable camera permission from your device settings to capture an incident photo.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ],
      );

      return false;
    }

    // Request camera permission
    permission =
      await PermissionService.requestCameraPermission();

    // Permission granted after request
    if (permission === RESULTS.GRANTED) {
      return true;
    }

    // Permission permanently blocked after request
    if (permission === RESULTS.BLOCKED) {

      Alert.alert(
        'Camera Permission Denied',
        'Camera access is required to report an incident.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ],
      );

      return false;
    }

    // Permission denied or unavailable
    showSnackbar(
      'Camera permission is required to capture an incident photo.',
      'error',
    );

    return false;

  };

  // ==========================================================================
  // Capture Incident Photo
  // ==========================================================================

  const handleCapturePhoto = useCallback(async () => {

    // Prevent multiple camera launches
    if (cameraRequestInProgress.current) {
      return;
    }

    // Prevent camera launch during submission
    if (submissionInProgress.current) {
      return;
    }

    cameraRequestInProgress.current = true;

    if (isMounted.current) {
      setCameraLoading(true);
    }

    try {

      // Verify camera permission
      const hasPermission =
        await verifyCameraPermission();

      if (!hasPermission) {
        return;
      }

      // Open device camera
      const capturedImage =
        await CameraService.openCamera();

      // Ignore response if screen was unmounted
      if (!isMounted.current) {
        return;
      }

      // User cancelled camera
      if (!capturedImage) {

        showSnackbar(
          'No photo captured. You can open the camera again.',
          'info',
        );

        return;
      }

      // Store captured image
      setIncidentImage(capturedImage);

      // Invalidate previous uploaded image URL
      setUploadedImageUrl(null);

      showSnackbar(
        'Incident photo captured successfully.',
        'success',
      );

    } catch (error) {

      if (isMounted.current) {
        showSnackbar(
          error.message || 'Unable to capture incident photo.',
          'error',
        );
      }

    } finally {

      cameraRequestInProgress.current = false;

      if (isMounted.current) {
        setCameraLoading(false);
      }

    }

  }, [showSnackbar]);

  // ==========================================================================
  // Submit Incident Report
  // ==========================================================================

  const handleSubmitIncident = useCallback(async () => {

    // Prevent duplicate submissions
    if (submissionInProgress.current) {
      return;
    }

    // Validate captured photograph
    if (!incidentImage?.uri) {

      showSnackbar(
        'Please capture an incident photograph first.',
        'warning',
      );

      return;
    }

    // Validate GPS location
    if (!location) {

      showSnackbar(
        'Current location is required to report an incident.',
        'warning',
      );

      return;
    }

    // Validate coordinates
    if (
      !Number.isFinite(location.latitude) ||
      !Number.isFinite(location.longitude)
    ) {

      showSnackbar(
        'Invalid location coordinates. Please refresh your location.',
        'error',
      );

      return;
    }

    submissionInProgress.current = true;

    if (isMounted.current) {
      setSubmissionLoading(true);
    }

    try {

      let imageUrl = uploadedImageUrl;

      // ======================================================================
      // Step 1: Upload Incident Image
      // ======================================================================

      if (!imageUrl) {

        showSnackbar(
          'Uploading incident photograph...',
          'info',
        );

        const uploadResponse =
          await uploadIncidentImage(incidentImage);

        // Extract Cloudinary image URL
        imageUrl = uploadResponse?.data?.imageUrl;

        if (!imageUrl) {
          throw new Error(
            'Image upload failed. No image URL received.'
          );
        }

        // Save uploaded URL for retry
        if (isMounted.current) {
          setUploadedImageUrl(imageUrl);
        }

      }

      // ======================================================================
      // Step 2: Prepare Incident Data
      // ======================================================================

      const incidentData = {

        // Description is optional
        description: description.trim() || null,

        // Uploaded Cloudinary image URL
        imageUrl: imageUrl,

        // Current GPS coordinates
        latitude: location.latitude,
        longitude: location.longitude,

      };

      // ======================================================================
      // Step 3: Submit Incident
      // ======================================================================

      const incidentResponse =
        await reportIncident(incidentData);

      // Verify backend response
      if (!incidentResponse?.data) {
        throw new Error(
          'Incident submission failed. Invalid server response.'
        );
      }

      // ======================================================================
      // Step 4: Submission Successful
      // ======================================================================

      if (isMounted.current) {

        Alert.alert(
          'Incident Reported Successfully',
          'Your incident report has been submitted successfully. Nearby volunteer coordination can now begin.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ],
          {
            cancelable: false,
          },
        );

      }

    } catch (error) {

      if (isMounted.current) {

        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'Unable to submit incident. Please try again.';

        showSnackbar(errorMessage, 'error');

      }

    } finally {

      submissionInProgress.current = false;

      if (isMounted.current) {
        setSubmissionLoading(false);
      }

    }

  }, [
    incidentImage,
    location,
    description,
    uploadedImageUrl,
    showSnackbar,
    navigation,
  ]);

  // ==========================================================================
  // Screen Initialization
  // ==========================================================================

  useEffect(() => {

    isMounted.current = true;

    // Fetch GPS location and launch camera
    fetchCurrentLocation();

    handleCapturePhoto();

    return () => {
      isMounted.current = false;
    };

  }, [fetchCurrentLocation, handleCapturePhoto]);

  // ==========================================================================
  // Render Location Details
  // ==========================================================================

  const renderLocationDetails = () => {

    // Location Loading
    if (locationLoading) {

      return (
        <View style={styles.locationStatus}>

          <ActivityIndicator
            size="small"
            color={COLORS.PRIMARY}
          />

          <Text style={styles.locationStatusText}>
            Fetching current location...
          </Text>

        </View>
      );

    }

    // Location Error
    if (locationError) {

      return (
        <View style={styles.locationErrorContainer}>

          <Text style={styles.locationErrorText}>
            {locationError}
          </Text>

          <TouchableOpacity
            onPress={fetchCurrentLocation}
            activeOpacity={0.7}
            style={styles.locationRetryButton}
          >

            <MaterialCommunityIcons
              name="refresh"
              size={18}
              color={COLORS.PRIMARY}
            />

            <Text style={styles.locationRetryText}>
              Retry
            </Text>

          </TouchableOpacity>

        </View>
      );

    }

    // Location Not Available
    if (!location) {
      return null;
    }

    // Location Successfully Fetched
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
  // Render Incident Photo
  // ==========================================================================

  const renderIncidentPhoto = () => {

    // Camera Loading
    if (cameraLoading) {

      return (
        <View style={styles.photoPlaceholder}>

          <ActivityIndicator
            size="large"
            color={COLORS.PRIMARY}
          />

          <Text style={styles.placeholderText}>
            Opening device camera...
          </Text>

        </View>
      );

    }

    // Captured Photo Preview
    if (incidentImage?.uri) {

      return (
        <Image
          source={{
            uri: incidentImage.uri,
          }}
          style={styles.incidentImage}
          resizeMode="cover"
          accessibilityLabel="Captured incident photograph"
        />
      );

    }

    // No Photo Captured
    return (

      <View style={styles.photoPlaceholder}>

        <MaterialCommunityIcons
          name="camera-plus-outline"
          size={54}
          color={COLORS.TEXT_DISABLED}
        />

        <Text style={styles.placeholderText}>
          No incident photo captured
        </Text>

        <Text style={styles.placeholderSubtext}>
          Open the camera to capture an accident photo.
        </Text>

      </View>

    );

  };

  // ==========================================================================
  // Render Screen
  // ==========================================================================

  return (

    <AppScreen
      scrollable
      keyboardAware
    >

      <View style={styles.container}>

        {/* ================================================================
            Header Section
        ================================================================ */}

        <View style={styles.header}>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            style={styles.backButton}
            accessibilityLabel="Go back"
            disabled={submissionLoading}
          >

            <MaterialCommunityIcons
              name="arrow-left"
              size={25}
              color={COLORS.TEXT_PRIMARY}
            />

          </TouchableOpacity>

          <View style={styles.headerTextContainer}>

            <Text style={styles.headerTitle}>
              Report Incident
            </Text>

            <Text style={styles.headerSubtitle}>
              Help nearby volunteers respond.
            </Text>

          </View>

        </View>

        {/* ================================================================
            Incident Photo Section
        ================================================================ */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Incident Photograph
          </Text>

          <Text style={styles.sectionDescription}>
            Capture a clear photograph of the road accident.
          </Text>

          <View style={styles.photoContainer}>
            {renderIncidentPhoto()}
          </View>

          <AppButton
            title={
              incidentImage
                ? 'Retake Photo'
                : 'Open Camera'
            }
            onPress={handleCapturePhoto}
            loading={cameraLoading}
            disabled={
              cameraLoading ||
              submissionLoading
            }
            style={styles.cameraButton}
          />

          <Text style={styles.cameraNote}>
            Only photographs captured using the device camera are supported.
          </Text>

        </View>

        {/* ================================================================
            Location Section
        ================================================================ */}

        <View style={styles.section}>

          <View style={styles.sectionHeadingRow}>

            <MaterialCommunityIcons
              name="map-marker"
              size={22}
              color={COLORS.PRIMARY}
            />

            <Text style={styles.sectionTitle}>
              Incident Location
            </Text>

          </View>

          {renderLocationDetails()}

        </View>

        {/* ================================================================
            Description Section
        ================================================================ */}

        <View style={styles.section}>

          <View style={styles.sectionHeadingRow}>

            <MaterialCommunityIcons
              name="text-box-outline"
              size={22}
              color={COLORS.PRIMARY}
            />

            <Text style={styles.sectionTitle}>
              Additional Details
            </Text>

            <Text style={styles.optionalLabel}>
              Optional
            </Text>

          </View>

          <AppInput
            value={description}
            onChangeText={setDescription}
            placeholder="Describe what happened (optional)..."
            multiline
            maxLength={500}
            numberOfLines={4}
            editable={!submissionLoading}
            style={styles.descriptionInput}
          />

          <Text style={styles.characterCount}>
            {description.length}/500 characters
          </Text>

        </View>

        {/* ================================================================
            Submit Incident Section
        ================================================================ */}

        <View style={styles.submitSection}>

          <AppButton
            title="Submit Incident Report"
            onPress={handleSubmitIncident}
            loading={submissionLoading}
            disabled={
              submissionLoading ||
              cameraLoading ||
              locationLoading ||
              !incidentImage ||
              !location
            }
            style={styles.submitButton}
          />

          <Text style={styles.submitNote}>
            Your photograph and current location will be shared
            to coordinate nearby assistance.
          </Text>

        </View>

      </View>

      {/* ================================================================
          Snackbar Feedback
      ================================================================ */}

      <AppSnackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onDismiss={dismissSnackbar}
      />

    </AppScreen>

  );

};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: SPACING.MD,
    paddingBottom: SPACING.XL,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },

  backButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.SM,
  },

  headerTextContainer: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },

  headerSubtitle: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.XS,
  },

  // Common Sections
  section: {
    marginBottom: SPACING.XL,
  },

  sectionHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
    marginBottom: SPACING.SM,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },

  sectionDescription: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.XS,
    marginBottom: SPACING.MD,
  },

  // Photo Preview
  photoContainer: {
    width: '100%',
    height: 230,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },

  incidentImage: {
    width: '100%',
    height: '100%',
  },

  photoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.MD,
  },

  placeholderText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.MD,
    textAlign: 'center',
  },

  placeholderSubtext: {
    fontSize: 12,
    color: COLORS.TEXT_DISABLED,
    textAlign: 'center',
    marginTop: SPACING.XS,
  },

  cameraButton: {
    marginTop: SPACING.MD,
  },

  cameraNote: {
    fontSize: 11,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.SM,
    textAlign: 'center',
  },

  // Location
  locationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.MD,
    gap: SPACING.SM,
  },

  locationStatusText: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
  },

  locationErrorContainer: {
    padding: SPACING.MD,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },

  locationErrorText: {
    fontSize: 13,
    color: COLORS.ERROR,
  },

  locationRetryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: SPACING.SM,
    gap: SPACING.XS,
  },

  locationRetryText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.PRIMARY,
  },

  coordinatesContainer: {
    backgroundColor: COLORS.WHITE,
    padding: SPACING.MD,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    gap: SPACING.MD,
  },

  coordinateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  coordinateLabel: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
  },

  coordinateValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },

  accuracyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: SPACING.SM,
    borderRadius: 8,
    gap: SPACING.SM,
  },

  accuracyText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.SUCCESS,
  },

  // Description
  optionalLabel: {
    fontSize: 11,
    color: COLORS.TEXT_DISABLED,
    marginLeft: 'auto',
  },

  descriptionInput: {
    marginTop: SPACING.SM,
  },

  characterCount: {
    fontSize: 11,
    color: COLORS.TEXT_DISABLED,
    textAlign: 'right',
    marginTop: SPACING.XS,
  },

  // Submit Incident
  submitSection: {
    marginTop: SPACING.SM,
    marginBottom: SPACING.XL,
  },

  submitButton: {
    marginTop: SPACING.SM,
  },

  submitNote: {
    fontSize: 11,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginTop: SPACING.SM,
    lineHeight: 17,
  },

});

export default ReportIncidentScreen;
