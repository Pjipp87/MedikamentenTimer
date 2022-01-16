import React, { useState, useEffect, useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../utils/FirebaseConfig";
import { Context } from "../utils/Context";
import {
  Button,
  Colors,
  Text,
  Modal,
  Portal,
  TextInput,
} from "react-native-paper";
import styled from "styled-components/native";
import { ViewComponent } from "../components/StyledView";
import { ActivityIndicator, Headline, Avatar } from "react-native-paper";
import { collection, getDoc, doc, addDocs, setDoc } from "firebase/firestore";
import { db } from "../utils/FirebaseConfig";
import { Surface } from "react-native-paper";
import { useWindowDimensions } from "react-native";
import WelcomeComponent from "../components/WelcomeComponent";
import { useTheme } from "react-native-paper";
import { onAuthStateChanged } from "firebase/auth";

import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

export const WelcomeScreen = ({ navigation }) => {
  const { user, setUserFunc, toggleSignIn } = useContext(Context);
  const { colors } = useTheme();
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [adressChangeModal, setadressChangeModal] = useState(false);
  const _toggleAdressChangeModal = () => {
    setadressChangeModal(!adressChangeModal);
  };
  const [adress, setAdress] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      _setUserInFirebase(user);
      _getAdressFromFirebase();
    });
  }, [user]);

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

  const _setUserInFirebase = async (user) => {
    //console.log(user);
    await setDoc(doc(db, "User", `${user.email}`, `Profil`, `Informationen`), {
      display: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    });
  };

  const _getAdressFromFirebase = async () => {
    const docSnap = await getDoc(
      doc(db, "User", `${user.email}`, `Profil`, `Adress`)
    );
    if (docSnap.exists()) {
      const data = docSnap.data();
      setAdress(data);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const _setAdressInFirebase = async () => {
    await setDoc(doc(db, "User", `${user.email}`, `Profil`, `Adress`), {
      street: street,
      zipcode: zipcode,
      city: city,
    });
  };

  const _saveAdress = () => {
    _setAdressInFirebase();
    setAdress({ street: street, zipcode: zipcode, city: city });
    setCity("");
    setStreet("");
    setZipcode("");
    _toggleAdressChangeModal();
  };

  return (
    <ViewComponent>
      {!user ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <Portal>
              <Modal
                visible={adressChangeModal}
                onDismiss={_toggleAdressChangeModal}
                contentContainerStyle={{
                  backgroundColor: colors.accent,
                  padding: 20,
                }}
              >
                <Headline>Neue Adresse</Headline>
                <TextInput
                  label="Straße"
                  value={street}
                  onChangeText={(text) => setStreet(text)}
                  activeUnderlineColor={colors.greenDark}
                />

                <TextInput
                  label="Postleitzahl"
                  activeUnderlineColor={colors.greenDark}
                  value={zipcode}
                  onChangeText={(text) => setZipcode(text)}
                  style={{ marginVertical: 5 }}
                  keyboardType="numeric"
                />
                <TextInput
                  label="Stadt"
                  value={city}
                  onChangeText={(text) => setCity(text)}
                  activeUnderlineColor={colors.greenDark}
                />
                <Button
                  onPress={() => _saveAdress()}
                  labelStyle={{ color: colors.greenDark }}
                >
                  Speichern
                </Button>
              </Modal>
            </Portal>

            <WelcomeComponent />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: colors.accent,
                padding: 20,
                width: useWindowDimensions().width,
              }}
            >
              <Avatar.Image source={{ uri: user.photoURL }} size={120} />
              <View
                style={{ flexDirection: "column", justifyContent: "flex-end" }}
              >
                <Headline style={{ fontSize: 30 }}>{user.displayName}</Headline>
                <Headline style={{ fontSize: 20 }}>{adress.street}</Headline>

                <Headline
                  style={{ fontSize: 20 }}
                >{`${adress.zipcode} ${adress.city}`}</Headline>
                <Button onPress={() => _toggleAdressChangeModal()}>
                  Adresse bearbeiten
                </Button>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.5,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: useWindowDimensions().width,
            }}
          >
            <Pressable
              onPress={() => navigation.navigate("Ihre Medikation")}
              style={{ elevation: 5 }}
            >
              <Surface
                style={{
                  justifyContent: "center",
                  padding: 20,
                  borderRadius: 100,
                  alignItems: "center",
                  elevation: 5,
                  width: 120,
                  height: 120,
                  backgroundColor: colors.greenDark,
                }}
              >
                <FontAwesome5
                  name="pills"
                  size={50}
                  color={colors.greenBright}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: colors.greenBright,
                  }}
                >
                  Medikation
                </Text>
              </Surface>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Ärzte")}
              style={{ elevation: 5 }}
            >
              <Surface
                style={{
                  justifyContent: "center",
                  padding: 20,
                  borderRadius: 100,
                  alignItems: "center",
                  elevation: 5,
                  width: 120,
                  height: 120,
                  backgroundColor: colors.greenDark,
                }}
              >
                <Fontisto name="doctor" size={50} color={colors.greenBright} />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    color: colors.greenBright,
                  }}
                >
                  Ärzte
                </Text>
              </Surface>
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={() => navigation.navigate("Notizen")}
              style={{ elevation: 5 }}
            >
              <Surface
                style={{
                  justifyContent: "center",
                  padding: 20,
                  borderRadius: 100,
                  alignItems: "center",
                  elevation: 5,
                  width: 120,
                  height: 120,
                  backgroundColor: colors.greenDark,
                }}
              >
                <FontAwesome5
                  name="pen-alt"
                  size={50}
                  color={colors.greenBright}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    color: colors.greenBright,
                  }}
                >
                  Notizen
                </Text>
              </Surface>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: useWindowDimensions().width,
              justifyContent: "space-evenly",
              marginBottom: 25,
              marginTop: 55,
            }}
          >
            <Button
              mode="contained"
              style={{
                color: colors.greenBright,
              }}
              color={colors.error}
              onPress={() => _logout()}
              icon="logout"
            >
              Logout
            </Button>
            <Button
              mode="contained"
              style={{
                color: colors.greenBright,
              }}
              icon="card-bulleted-settings-outline"
              color={colors.greenDark}
              onPress={() => alert("Folgt noch")}
            >
              Profil ändern
            </Button>
          </View>
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
