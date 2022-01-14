import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../utils/FirebaseConfig";
import { Context } from "../utils/Context";
import { Button } from "react-native-paper";

export const WelcomeScreen = () => {
  const { user, setUserFunc, toggleSignIn } = useContext(Context);

  const _logout = () => {
    signOut(auth)
      .then(() => {
        setUserFunc({});
        toggleSignIn();
      })
      .catch((error) => {
        //console.log("Logout error");
      });
  };

  return (
    <View style={styles.main}>
      <Text>Willkommen {user.displayName}</Text>
      <Button onPress={() => _logout()}>Logout</Button>
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
