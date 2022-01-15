import React from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";
import { Surface, Avatar } from "react-native-paper";

export const LoginButton = ({ request, promptAsync }) => {
  return (
    <Pressable
      disabled={!request}
      onPress={() => {
        promptAsync();
      }}
    >
      <Surface style={{ backgroundColor: "blue" }}>
        <Avatar.Icon />
        <Text>Mit Google einloggen</Text>
      </Surface>
    </Pressable>
  );
};

const styles = StyleSheet.create({});
