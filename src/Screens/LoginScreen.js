import React, { useContext, useEffect } from "react";
import { StyleSheet, Button, View } from "react-native";
import { Context } from "../utils/Context";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

//#############################

export const LoginScreen = () => {
  const { toggleSignIn, setUserFunc } = useContext(Context);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "713405592516-ol60pnhss6aslg9e9cpebqfc1ec2uc15.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId:
      "713405592516-u5sc7u9r62tq01ctj9ifmhn7btfp3e0m.apps.googleusercontent.com",
    webClientId: "GOOGLE_GUID.apps.googleusercontent.com",

    /**
     *     redirectUri: AuthSession.makeRedirectUri({
      native: "com.scarfacehbc.medikamententimer://",
    }),
     */
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      const auth = response.params;

      toggleSignIn();
    }
  }, [response]);

  return (
    <View>
      <Button
        disabled={!request}
        title="Mit Google Account einloggen"
        onPress={() => {
          promptAsync();
        }}
      />
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
