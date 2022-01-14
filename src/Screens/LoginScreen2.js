import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { Button, View, Text } from "react-native";
import { auth } from "../utils/FirebaseConfig";

WebBrowser.maybeCompleteAuthSession();

//#############################

export const LoginScreen2 = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:
      "713405592516-ol60pnhss6aslg9e9cpebqfc1ec2uc15.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId:
      "713405592516-u5sc7u9r62tq01ctj9ifmhn7btfp3e0m.apps.googleusercontent.com",
    webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          alert(error);
          console.log("error: ", error);
        });
    }
  }, [response]);

  return (
    <View>
      <Text style={{ textAlign: "center" }}>Login2</Text>
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

/**
 *  AuthSession.makeRedirectUri({
              native: "com.scarfacehbc.medikamententimer",
            })





            //"scheme": "com.scarfacehbc.medikamententimer",
 */
