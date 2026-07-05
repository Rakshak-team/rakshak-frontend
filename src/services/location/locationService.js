/**
 * ============================================================================
 * File: locationService.js
 * Path: src/services/location/locationService.js
 * ----------------------------------------------------------------------------
 * Description:
 * Centralized location service for the Rakshak application.
 *
 * Responsibilities:
 * • Get the device's current location
 * • Return standardized location data
 * • Handle location related errors
 *
 * Note:
 * This service assumes location permission has already been granted.
 * Permission handling is managed by PermissionService.
 * ============================================================================
 */

// Imports
import Geolocation from "react-native-geolocation-service";

// Default location configuration
const LOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 10000,
  forceRequestLocation: true,
  showLocationDialog: true,
};

// Location Service
const LocationService = {

  // Fetch the device's current location
  async getCurrentLocation() {

    return new Promise((resolve, reject) => {

      Geolocation.getCurrentPosition(

        // Location fetched successfully
        (position) => {

          const { coords, timestamp } = position;

          // Return only the fields required by the application
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
            altitude: coords.altitude,
            heading: coords.heading,
            speed: coords.speed,
            timestamp,
          });

        },

        // Failed to fetch location
        (error) => {

          reject(
            new Error(
              error.message || "Unable to fetch current location."
            )
          );

        },

        LOCATION_OPTIONS

      );

    });

  },

};

export default LocationService;