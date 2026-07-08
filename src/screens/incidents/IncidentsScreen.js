import React from "react";
import { View, Text, StyleSheet } from "react-native";

const IncidentsScreen = () => {

  return (
    <View style={styles.container}>
      <Text>Incidents Screen</Text>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IncidentsScreen;