/**
 * ============================================================================
 * File: WelcomeScreen.js
 * Path: src/screens/auth/Welcome/WelcomeScreen.js
 * ----------------------------------------------------------------------------
 * Description:
 * Welcome screen of the Rakshak application.
 *
 * Responsibilities:
 * • Display application branding
 * • Navigate to Login
 * • Navigate to Register
 * ============================================================================
 */

import React from "react";
import { View } from "react-native";

import { ROUTES } from "../../../navigation/routes";

import {
  COLORS,
  TEXT_VARIANTS,
} from "../../../constants/theme";

import {
  AppButton,
  AppLogo,
  AppScreen,
  AppText,
} from "../../../components/ui";

import styles from "./welcomeStyles";

const WelcomeScreen = ({ navigation }) => {

  return (

    <AppScreen>

      <View style={styles.container}>

        {/* ==========================================================
            Branding
        ========================================================== */}

        <View style={styles.header}>

          <AppLogo />

          <AppText
            variant={TEXT_VARIANTS.BODY}
            color={COLORS.TEXT_SECONDARY}
            style={styles.description}
          >
            Report emergencies, alert nearby volunteers,
            and help save lives in your community.
          </AppText>

        </View>

        {/* ==========================================================
            Actions
        ========================================================== */}

        <View style={styles.actions}>

          <AppButton
            title="Login"
            onPress={() =>
              navigation.navigate(
                ROUTES.LOGIN
              )
            }
          />

          <AppButton
            title="Create Account"
            variant="outline"
            style={styles.registerButton}
            onPress={() =>
              navigation.navigate(
                ROUTES.REGISTER
              )
            }
          />

        </View>

      </View>

    </AppScreen>

  );

};

export default WelcomeScreen;