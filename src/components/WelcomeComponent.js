import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Headline } from "react-native-paper";

export default function WelcomeComponent() {
  const date = new Date();
  const time = date.getHours();
  // Time Test
  //time = 18;
  let greeting;
  if (time >= 5 && time <= 12) {
    greeting = "Morgen";
  } else if (time > 12 && time < 17) {
    greeting = "Tag";
  } else if (time >= 17 || time < 5) {
    greeting = "Abend";
  }

  return (
    <View style={{ paddingVertical: 30 }}>
      <Headline
        style={{
          textAlign: "center",
          fontStyle: "italic",
          fontWeight: "bold",
          fontSize: 30,
        }}
      >
        Guten {greeting}
      </Headline>
    </View>
  );
}

const styles = StyleSheet.create({});
