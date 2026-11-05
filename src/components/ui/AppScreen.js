
/**
 * ============================================================================
 * File: AppScreen.js
 * Path: src/components/ui/AppScreen.js
 * ----------------------------------------------------------------------------
 * Description:
 * Reusable screen wrapper for the Rakshak application.
 *
 * Features:
 * • Safe Area handling
 * • StatusBar configuration
 * • Optional scrolling
 * • Optional keyboard avoiding
 * • Configurable padding
 * • Theme based background
 * ============================================================================
 */

import React from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  COLORS,
  SPACING,
} from '../../constants/theme';

export default function AppScreen({
  children,
  scrollable = false,
  keyboardAware = false,
  padded = true,
  backgroundColor = COLORS.BACKGROUND,
  statusBarStyle = 'dark-content',
  safeAreaEdges = ['top', 'bottom'],
  style,
}) {
  const content = (
    <View
      style={[
        scrollable ? styles.scrollableContent : styles.content,
        padded && styles.padded,
        style,
      ]}
    >
      {children}
    </View>
  );

  const screen = scrollable ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
    >
      {content}
    </ScrollView>
  ) : (
    content
  );

  return (
    <SafeAreaView
      edges={safeAreaEdges}
      style={[
        styles.container,
        { backgroundColor },
      ]}
    >
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={backgroundColor}
      />

      {keyboardAware ? (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {screen}
        </KeyboardAvoidingView>
      ) : (
        screen
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  flex: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  scrollableContent: {
    flexGrow: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  padded: {
    paddingHorizontal: SPACING.LG,
  },
});
