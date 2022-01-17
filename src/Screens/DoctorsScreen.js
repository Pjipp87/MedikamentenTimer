import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, useWindowDimensions } from "react-native";
import {
  Button,
  Text,
  Headline,
  Title,
  useTheme,
  Portal,
  TextInput,
  Modal,
  Dialog,
  Paragraph,
} from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  getDocs,
  doc,
  addDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/FirebaseConfig";
import { Context } from "../utils/Context";

export const DoctorsScreen = ({ navigation }) => {
  const { user } = useContext(Context);
  const { colors } = useTheme();
  const [doctors, setDoctors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [doctorStreet, setdoctorStreet] = useState("");
  const [doctorSpecialist, setDoctorSpecialist] = useState("");
  const [doctorZipcode, setDoctorZipcode] = useState("");
  const [doctorCity, setDoctorCity] = useState("");
  const [doctorTel, setdoctorTel] = useState("");
  const [alertVisible, setAlertVisible] = React.useState(false);
  const [doctorToRemove, setdoctorToRemove] = useState("");
  const _toggleAlert = (item) => {
    setdoctorToRemove(item);
    setAlertVisible(!alertVisible);
  };

  useEffect(() => {
    _getDoctors();
  }, [!doctors]);

  const _toggleModalVisibale = () => setModalVisible(!modalVisible);

  const _saveDoctor = async () => {
    await setDoc(doc(db, "User", `${user.email}`, `Doctor`, `${doctorName}`), {
      name: doctorName,
      specialist: doctorSpecialist,
      street: doctorStreet,
      zipcode: doctorZipcode,
      city: doctorCity,
      tel: doctorTel,
      id: uuidv4(),
    }).then(() => {
      setDoctorName("");
      setDoctorSpecialist("");
      setdoctorStreet("");
      setDoctorZipcode("");
      setDoctorCity("");
      setdoctorTel("");
      _toggleModalVisibale();
      _getDoctors();
    });
  };

  const _getDoctors = async () => {
    let tempArray = [];
    const querySnapshot = await getDocs(
      collection(db, "User", `${user.email}`, `Doctor`)
    );
    querySnapshot.forEach((doc) => {
      tempArray.push(doc.data());
    });
    setDoctors(tempArray);
  };

  const _deleteDoctor = async (item) => {
    await deleteDoc(doc(db, "User", `${user.email}`, `Doctor`, `${item}`)).then(
      () => {
        _getDoctors();
        _toggleAlert();
      }
    );
  };
  /**
  * 
  *  const doctors = [
    {
      name: "Konofsyk",
      specialist: "Augenarzt",
      street: "Karlstraße 2/4",
      zipcode: "95028",
      city: "Hof",
      tel: "09281 1008",
      id: 1,
    },
    {
      name: "Kücüköztürk",
      specialist: "Hausarzt",
      street: "Gabelsbergerstraße 45",
      zipcode: "95028",
      city: "Hof",
      tel: "09281 84722",
      id: 2,
    },
    {
      name: "Swoboda",
      specialist: "Allgemeinmedizin",
      street: "Königstraße 19",
      zipcode: "95028",
      city: "Hof",
      tel: "09281 3861",
      id: 3,
    },
    {
      name: "Dietrich",
      specialist: "Kinderarzt",
      street: "Luitpoldstraße 19",
      zipcode: "95028",
      city: "Hof",
      tel: "09281 3816",
      id: 4,
    },
    {
      name: "Konofsyk",
      specialist: "Augenarzt",
      street: "Karlstraße 2/4",
      zipcode: "95028",
      city: "Hof",
      tel: "09281 1008",
      id: 5,
    },
    {
      name: "Kücüköztürk",
      specialist: "Hausarzt",
      street: "Gabelsbergerstraße 45",
      zipcode: "95028",
      city: "Hof",
      tel: "09281 84722",
      id: 6,
    },
    {
      name: "Swoboda",
      specialist: "Allgemeinmedizin",
      street: "Königstraße 19",
      zipcode: "95028",
      city: "Hof",
      tel: "09281 3861",
      id: 7,
    },
    {
      name: "Dietrich",
      specialist: "Kinderarzt",
      street: "Luitpoldstraße 19",
      zipcode: "95028",
      city: "Hof",
      tel: "09281 3816",
      id: 8,
    },
    {
      name: "Konofsyk",
      specialist: "Augenarzt",
      street: "Karlstraße 2/4",
      zipcode: "95028",
      city: "Hof",
      tel: "09281 1008",
      id: 9,
    },
    {
      name: "Kücüköztürk",
      specialist: "Hausarzt",
      street: "Gabelsbergerstraße 45",
      zipcode: "95028",
      city: "Hof",
      tel: "09281 84722",
      id: 10,
    },
    {
      name: "Swoboda",
      specialist: "Allgemeinmedizin",
      street: "Königstraße 19",
      zipcode: "95028",
      city: "Hof",
      tel: "09281 3861",
      id: 11,
    },
    {
      name: "Dietrich",
      specialist: "Kinderarzt",
      street: "Luitpoldstraße 19",
      zipcode: "95028",
      city: "Hof",
      tel: "09281 3816",
      id: 12,
    },
    {
      name: "Konofsyk",
      specialist: "Augenarzt",
      street: "Karlstraße 2/4",
      zipcode: "95028",
      city: "Hof",
      tel: "09281 1008",
      id: 13,
    },
    {
      name: "Kücüköztürk",
      specialist: "Hausarzt",
      street: "Gabelsbergerstraße 45",
      zipcode: "95028",
      city: "Hof",
      tel: "09281 84722",
      id: 14,
    },
    {
      name: "Swoboda",
      specialist: "Allgemeinmedizin",
      street: "Königstraße 19",
      zipcode: "95028",
      city: "Hof",
      tel: "09281 3861",
      id: 15,
    },
    {
      name: "Dietrich",
      specialist: "Kinderarzt",
      street: "Luitpoldstraße 19",
      zipcode: "95028",
      city: "Hof",
      tel: "09281 3816",
      id: 16,
    },
  ];
  */

  const ListItem = ({ item }) => {
    return (
      <View
        style={{
          marginVertical: 15,
          borderBottomColor: "black",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Headline>{`${item.name}`}</Headline>
          <Text>{`${item.specialist}`}</Text>
        </View>
        <Button
          labelStyle={{ fontSize: 20 }}
          onPress={() => _toggleAlert(item.name)}
        >
          X
        </Button>
      </View>
    );
  };

  return (
    <>
      <Portal>
        <Dialog visible={alertVisible} onDismiss={_toggleAlert}>
          <Dialog.Title>Arzt entfernen?</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Möchten Sie den Arzt {doctorToRemove} aus Ihrer Liste entfernen?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => _toggleAlert()} color={colors.greenDark}>
              Abbrechen
            </Button>
            <Button
              onPress={() => _deleteDoctor(doctorToRemove)}
              color={colors.notification}
            >
              Löschen
            </Button>
          </Dialog.Actions>
        </Dialog>
        <Modal
          visible={modalVisible}
          onDismiss={_toggleModalVisibale}
          contentContainerStyle={{
            backgroundColor: colors.accent,
            padding: 20,
          }}
        >
          <View>
            <Title>BitteDaten eingeben eingeben...</Title>
            <View style={{ marginVertical: 40 }}>
              <TextInput
                label="Name des Arztes"
                value={doctorName}
                onChangeText={(name) => setDoctorName(name)}
                activeUnderlineColor={colors.greenDark}
              />
              <TextInput
                label="Fachrichtung"
                value={doctorSpecialist}
                onChangeText={(specialist) => setDoctorSpecialist(specialist)}
                activeUnderlineColor={colors.greenDark}
              />
              <TextInput
                label="Telefonnummer"
                value={doctorTel}
                onChangeText={(tel) => setdoctorTel(tel)}
                activeUnderlineColor={colors.greenDark}
              />
              <TextInput
                label="Straße und Hausnummer"
                value={doctorStreet}
                onChangeText={(street) => setdoctorStreet(street)}
                activeUnderlineColor={colors.greenDark}
              />
              <TextInput
                label="Postleitzahl"
                value={doctorZipcode}
                onChangeText={(zipcode) => setDoctorZipcode(zipcode)}
                activeUnderlineColor={colors.greenDark}
              />
              <TextInput
                label="Ort"
                value={doctorCity}
                onChangeText={(city) => setDoctorCity(city)}
                activeUnderlineColor={colors.greenDark}
              />

              <Button
                mode="contained"
                icon="content-save-outline"
                color={colors.greenDark}
                onPress={() => _saveDoctor()}
              >
                Speichern
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
      <View style={styles.main}>
        <FlatList
          data={doctors}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={(item) => item.id}
          style={{ width: useWindowDimensions().width, paddingHorizontal: 25 }}
        />
        <View
          style={{
            flexDirection: "row",
            width: useWindowDimensions().width,
            justifyContent: "space-around",
          }}
        >
          <Button onPress={() => navigation.navigate("Willkommen")}>
            Zurück
          </Button>
          <Button onPress={() => _toggleModalVisibale()}>
            Arzt hinzufügen
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 25,
  },
});
