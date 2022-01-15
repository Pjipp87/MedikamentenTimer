import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../utils/FirebaseConfig";
import { Context } from "../utils/Context";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import { ViewComponent } from "../components/StyledView";
import { ActivityIndicator, Headline, Avatar } from "react-native-paper";
import { collection, addDoc, doc, addDocs, setDoc } from "firebase/firestore";
import { db } from "../utils/FirebaseConfig";

export const WelcomeScreen = () => {
  const { user, setUserFunc, toggleSignIn } = useContext(Context);

  // TODO: Logout in eine andere Datei (LOGOUT_LOGIN.js)
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
    <ViewComponent>
      {!user ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Headline>Willkommen</Headline>
          <View style={{ flexDirection: "row" }}>
            <Avatar.Image source={{ uri: user.photoURL }} />
            <Text> {user.displayName}</Text>
          </View>
          <Button onPress={() => _logout()}>Logout</Button>
        </>
      )}
    </ViewComponent>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
