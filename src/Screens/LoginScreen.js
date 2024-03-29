import React, { useContext, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { useTheme } from "react-native-paper";
import { ViewComponent } from "../components/StyledView";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { Image } from "react-native";
import { auth } from "../utils/FirebaseConfig";
import { Context } from "../utils/Context";
import { Button } from "react-native-paper";

WebBrowser.maybeCompleteAuthSession();

//#############################

export const LoginScreen = () => {
  const { toggleSignIn, setUserFunc } = useContext(Context);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:
      "713405592516-ol60pnhss6aslg9e9cpebqfc1ec2uc15.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId:
      "713405592516-u5sc7u9r62tq01ctj9ifmhn7btfp3e0m.apps.googleusercontent.com",
    webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  });
  const { colors } = useTheme();

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      //console.log(request);

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          const user = userCredential.user;
          setUserFunc(user);
          toggleSignIn();
        })

        .catch((error) => {
          //console.log("error: ", error);
        });
    }
  }, [response]);

  return (
    <ViewComponent
      style={{
        justifyContent: "flex-start",
        backgroundColor: colors.LoginBackground,
      }}
    >
      <Image
        source={require("../images/Lgog.png")}
        resizeMode="contain"
        style={{
          marginBottom: 50,
          width: "100%",
        }}
      />
      <Button
        icon="google"
        mode="contained"
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
        Mit Google Account einloggen
      </Button>
    </ViewComponent>
  );
};

/**
 *  <LoginButton
        request={request}
        promptAsync={() => {
          promptAsync();
        }}
      />
 */

/**
       *  onAuthStateChanged(auth, (user) => {
            _setUserInFirebase(user);
            setUserFunc(user);
            toggleSignIn();
          })
       */
