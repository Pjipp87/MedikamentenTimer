import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export const DoctorsScreen = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <Text>Ärzte</Text>
      <Button onPress={() => navigation.navigate("Willkommen")}>Zurück</Button>
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
