import React, { useState } from "react";
import { StyleSheet, Button, View, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = () => {
  AuthSession.makeRedirectUri({
    scheme: "com.scarfacehbc.MedikamentenTimer",
  });

  const [isLoeggedIn, setIsLoeggedIn] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "713405592516-ol60pnhss6aslg9e9cpebqfc1ec2uc15.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId:
      "713405592516-j26adu6q61uroeae5l01fnfhr72qm4m4.apps.googleusercontent.com",
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
          promptAsync({ useProxy: true });
        }}
      />
      <Text>{isLoeggedIn ? "Eingeloggt" : null}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});