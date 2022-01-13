import React, { useState } from "react";
import { StyleSheet, Button, View, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = () => {
  const [isLoeggedIn, setIsLoeggedIn] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "386412330846-jil9jav6u2t8mjefl2ctuo6br4sc8j12.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId:
      "386412330846-5edv9fhf9knj0p3090g1p2qng3apdu01.apps.googleusercontent.com",
    webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Klappt");
      setIsLoeggedIn(true);
    }
  }, [response]);

  return (
    <View style={{ flex: 1, paddingTop: 250 }}>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
      <Text>{isLoeggedIn ? "Eingeloggt" : null}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
