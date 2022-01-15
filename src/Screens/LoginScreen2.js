import React, { useContext, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { Button, View, Text } from "react-native";
import { auth } from "../utils/FirebaseConfig";
import { Context } from "../utils/Context";
import { collection, addDoc, doc, addDocs, setDoc } from "firebase/firestore";
import { db } from "../utils/FirebaseConfig";

WebBrowser.maybeCompleteAuthSession();

//#############################

export const LoginScreen2 = () => {
  const { toggleSignIn, setUserFunc, user } = useContext(Context);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:
      "713405592516-ol60pnhss6aslg9e9cpebqfc1ec2uc15.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId:
      "713405592516-u5sc7u9r62tq01ctj9ifmhn7btfp3e0m.apps.googleusercontent.com",
    webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      //console.log(request);

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .then(() =>
          onAuthStateChanged(auth, (user) => {
            _setUserInFirebase(user);
            setUserFunc(user);
            toggleSignIn();
          })
        )

        .catch((error) => {
          //console.log("error: ", error);
        });
    }
  }, [response]);

  const _setUserInFirebase = async (user) => {
    await setDoc(doc(db, "User", `${user.email}`, `Profil`, `Informationen`), {
      display: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    });
  };

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
