/**
 * ============================================================================
 * File: RegisterScreen.js
 * Path: src/screens/auth/Register/RegisterScreen.js
 * ----------------------------------------------------------------------------
 * Description:
 * Registration screen of the Rakshak application.
 *
 * Responsibilities:
 * • Render registration UI
 * • Manage local UI state
 * • Register new users
 * • Support Normal & Medical Volunteers
 * • Display validation/API messages
 * ============================================================================
 */

// Imports
import React, { useState } from 'react';

import { View, Pressable } from 'react-native';

import { ROUTES } from '../../../navigation/routes';

import { COLORS, TEXT_VARIANTS } from '../../../constants/theme';

import {
  AppButton,
  AppInput,
  AppLink,
  AppLogo,
  AppScreen,
  AppSnackbar,
  AppText,
} from '../../../components/ui';

import { handleRegister } from './registerHandlers';

import styles from './registerStyles';

/**
 * ============================================================================
 * Register Screen
 * ============================================================================
 */
const RegisterScreen = ({ navigation }) => {
  /**
   * ==========================================================================
   * Form State
   * ==========================================================================
   */

  const [volunteerType, setVolunteerType] = useState('NORMAL');

  const [firstName, setFirstName] = useState('');

  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const [bloodGroup, setBloodGroup] = useState('');

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  /**
   * ==========================================================================
   * Medical Professional Fields
   * ==========================================================================
   */

  const [medicalProfession, setMedicalProfession] = useState('');

  const [organization, setOrganization] = useState('');

  const [registrationNumber, setRegistrationNumber] = useState('');

  /**
   * ==========================================================================
   * Validation Errors
   * ==========================================================================
   */

  const [errors, setErrors] = useState({});

  /**
   * ==========================================================================
   * UI State
   * ==========================================================================
   */

  const [loading, setLoading] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [snackbarType, setSnackbarType] = useState('info');

  /**
   * ==========================================================================
   * Register Button
   * ==========================================================================
   */

  const onRegisterPress = async () => {
    setLoading(true);

    const result = await handleRegister({
      volunteerType,

      firstName,

      lastName,

      email,

      phoneNumber,

      bloodGroup,

      password,

      confirmPassword,

      medicalProfession,

      organization,

      registrationNumber,
    });

    setLoading(false);

    /**
     * Validation / API Failed
     */
    if (!result.success) {
      setErrors(result.errors || {});

      if (result.message) {
        setSnackbarMessage(result.message);

        setSnackbarType('error');

        setSnackbarVisible(true);
      }

      return;
    }

    /**
     * Clear Errors
     */
    setErrors({});

    /**
     * Success Snackbar
     */
    setSnackbarMessage(result.message);

    setSnackbarType('success');

    setSnackbarVisible(true);

    /**
     * Navigate To Login
     */
    navigation.replace(ROUTES.LOGIN);
  };

  /**
   * ==========================================================================
   * Render UI
   * ==========================================================================
   */

  return (
    <AppScreen scrollable keyboardAware>
      <View style={styles.container}>
        {/* ==========================================================
            Header
        ========================================================== */}

        <View style={styles.header}>
          <AppLogo />

          <AppText variant={TEXT_VARIANTS.TITLE}>Create Account</AppText>

          <AppText variant={TEXT_VARIANTS.BODY} color={COLORS.TEXT_SECONDARY}>
            Join Rakshak and become a volunteer for your community.
          </AppText>
        </View>

        {/* ==========================================================
            Volunteer Type
        ========================================================== */}

        <View style={styles.form}>
          <AppText variant={TEXT_VARIANTS.SUBTITLE}>Volunteer Type</AppText>

          <View style={styles.volunteerContainer}>
            <Pressable
              onPress={() => setVolunteerType('NORMAL')}
              style={[
                styles.volunteerCard,

                volunteerType === 'NORMAL' && styles.selectedCard,
              ]}
            >
              <AppText variant={TEXT_VARIANTS.SUBTITLE}>
                Normal Volunteer
              </AppText>

              <AppText
                variant={TEXT_VARIANTS.CAPTION}
                color={COLORS.TEXT_SECONDARY}
              >
                Help nearby people during emergencies.
              </AppText>
            </Pressable>

            <Pressable
              onPress={() => setVolunteerType('MEDICAL')}
              style={[
                styles.volunteerCard,

                volunteerType === 'MEDICAL' && styles.selectedCard,
              ]}
            >
              <AppText variant={TEXT_VARIANTS.SUBTITLE}>
                Medical Professional
              </AppText>

              <AppText
                variant={TEXT_VARIANTS.CAPTION}
                color={COLORS.TEXT_SECONDARY}
              >
                Verified doctors, nurses & paramedics.
              </AppText>
            </Pressable>
          </View>

          {/* ==========================================================
              Basic Information
          ========================================================== */}

          <AppInput
            label="First Name"
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            error={errors.firstName}
          />

          <AppInput
            label="Last Name"
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            error={errors.lastName}
          />

          <AppInput
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />

          <AppInput
            label="Phone Number"
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            error={errors.phoneNumber}
          />

          <AppInput
            label="Blood Group"
            placeholder="Example: A+, O-, AB+"
            autoCapitalize="characters"
            value={bloodGroup}
            onChangeText={setBloodGroup}
            error={errors.bloodGroup}
          />

          {/* ==========================================================
              Medical Professional Details
          ========================================================== */}

          {volunteerType === 'MEDICAL' && (
            <>
              <AppInput
                label="Medical Profession"
                placeholder="Doctor / Nurse / Paramedic"
                value={medicalProfession}
                onChangeText={setMedicalProfession}
                autoCapitalize="words"
                error={errors.medicalProfession}
              />

              <AppInput
                label="Hospital / Organization"
                placeholder="Enter organization name"
                value={organization}
                onChangeText={setOrganization}
                autoCapitalize="words"
                error={errors.organization}
              />

              <AppInput
                label="Registration Number"
                placeholder="Enter registration number"
                value={registrationNumber}
                onChangeText={setRegistrationNumber}
                autoCapitalize="characters"
                error={errors.registrationNumber}
              />
            </>
          )}

          {/* ==========================================================
              Security
          ========================================================== */}

          <AppInput
            label="Password"
            placeholder="Create a password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />

          <AppInput
            label="Confirm Password"
            placeholder="Confirm your password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={errors.confirmPassword}
          />

          <AppButton
            title="Create Account"
            loading={loading}
            onPress={onRegisterPress}
          />
        </View>
        {/* ==========================================================
            Login Section
        ========================================================== */}

        <View style={styles.loginContainer}>
          <AppText variant={TEXT_VARIANTS.BODY}>
            Already have an account?
          </AppText>

          <AppLink onPress={() => navigation.navigate(ROUTES.LOGIN)}>
            Login
          </AppLink>
        </View>
      </View>

      {/* ==========================================================
          Snackbar
      ========================================================== */}

      <AppSnackbar
        visible={snackbarVisible}
        message={snackbarMessage}
        type={snackbarType}
        onDismiss={() => setSnackbarVisible(false)}
      />
    </AppScreen>
  );
};

export default RegisterScreen;
