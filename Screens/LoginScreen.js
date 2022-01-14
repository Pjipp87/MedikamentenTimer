import React, { useState } from "react";
import { StyleSheet, Button, View, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as AppAuth from "expo-app-auth";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

//#############################
const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export const LoginScreen = () => {
  const [isLoeggedIn, setIsLoeggedIn] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "713405592516-ol60pnhss6aslg9e9cpebqfc1ec2uc15.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId:
      "713405592516-u5sc7u9r62tq01ctj9ifmhn7btfp3e0m.apps.googleusercontent.com",
    webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    redirectUri: makeRedirectUri({
      native: "com.scarfacehbc.medikamententimer://",
    }),
    //###################
    /**
     * redirectUri: AuthSession.makeRedirectUri({
      scheme: "com.scarfacehbc.medikamententimer",
    }),
     */
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Klappt");
      setIsLoeggedIn(true);
      console.log(Linking.createURL());
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

/**
 *  AuthSession.makeRedirectUri({
              native: "com.scarfacehbc.medikamententimer",
            })





            //"scheme": "com.scarfacehbc.medikamententimer",
 */
