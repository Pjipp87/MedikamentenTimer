import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const WelcomeScreen = () => {
  return (
    <View style={styles.main}>
      <Text>Willkommen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
