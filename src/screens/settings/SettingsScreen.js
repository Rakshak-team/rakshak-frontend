
import React from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { logout } from '../../redux/auth/authSlice';
import { logoutUser } from '../auth/Login/loginService';
import { ROUTES } from '../../navigation/routes';

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout from Rakshak?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: performLogout,
        },
      ],
    );
  };

  const performLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      // Local logout should continue even if the backend request fails.
    } finally {
      dispatch(logout());

      navigation.getParent()?.reset({
        index: 0,
        routes: [{ name: ROUTES.AUTH }],
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          Manage your Rakshak account
        </Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.8}
        onPress={handleLogout}
      >
        <MaterialCommunityIcons
          name="logout"
          size={24}
          color={COLORS.ERROR}
        />

        <View style={styles.logoutTextContainer}>
          <Text style={styles.logoutTitle}>Logout</Text>
          <Text style={styles.logoutSubtitle}>
            Sign out of your Rakshak account
          </Text>
        </View>

        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={COLORS.TEXT_SECONDARY}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    padding: SPACING.MD,
  },

  header: {
    marginBottom: SPACING.XL,
  },

  title: {
    fontSize: TYPOGRAPHY.FONT_SIZE.XL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
    color: COLORS.TEXT_PRIMARY,
  },

  subtitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE.SM,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.XS,
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    padding: SPACING.MD,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },

  logoutTextContainer: {
    flex: 1,
    marginLeft: SPACING.MD,
  },

  logoutTitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE.MD,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
    color: COLORS.ERROR,
  },

  logoutSubtitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE.SM,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.XS,
  },
});

export default SettingsScreen;
