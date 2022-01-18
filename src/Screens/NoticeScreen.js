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

export const NoticeScreen = ({ navigation }) => {
  const { user } = useContext(Context);
  const { colors } = useTheme();
  const [doctors, setDoctors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [noticeTitel, setNoticeTitel] = useState("");
  const [noticeText, setNoticeText] = useState("");
  const [alertVisible, setAlertVisible] = React.useState(false);
  const [noticeToRemove, setnoticeToRemove] = useState("");
  const [notice, setNotice] = useState([]);
  const _toggleAlert = (item) => {
    setdoctorToRemove(item);
    setAlertVisible(!alertVisible);
  };

  useEffect(() => {
    _getNotice();
  }, [!notice]);

  const _toggleModalVisibale = () => setModalVisible(!modalVisible);

  const _saveNotice = async () => {
    await setDoc(doc(db, "User", `${user.email}`, `Notice`, `${noticeTitel}`), {
      titel: noticeTitel,
      text: noticeText,
    }).then(() => {
      setNoticeTitel("");
      setNoticeText("");
      _toggleModalVisibale();
      _getNotice();
    });
  };

  const _getNotice = async () => {
    let tempArray = [];
    const querySnapshot = await getDocs(
      collection(db, "User", `${user.email}`, `Notice`)
    );
    querySnapshot.forEach((doc) => {
      tempArray.push(doc.data());
    });
    setNotice(tempArray);
  };

  const _deleteNotice = async (item) => {
    await deleteDoc(doc(db, "User", `${user.email}`, `Notice`, `${item}`)).then(
      () => {
        _getNotice();
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
          <Headline>{`${item.titel}`}</Headline>
          <Text>{`${item.text}`}</Text>
        </View>
        <Button
          labelStyle={{ fontSize: 20 }}
          onPress={() => _toggleAlert(item.titel)}
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
              Möchten Sie die Notiz {noticeToRemove} entfernen?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => _toggleAlert()} color={colors.greenDark}>
              Abbrechen
            </Button>
            <Button
              onPress={() => _deleteNotice(noticeToRemove)}
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
            <Title>Bitte Notiz eingeben</Title>
            <View style={{ marginVertical: 40 }}>
              <TextInput
                label="Titel"
                value={noticeTitel}
                onChangeText={(titel) => setNoticeTitel(titel)}
                activeUnderlineColor={colors.greenDark}
              />
              <TextInput
                label="Text"
                value={noticeText}
                onChangeText={(text) => setNoticeText(text)}
                activeUnderlineColor={colors.greenDark}
              />

              <Button
                mode="contained"
                icon="content-save-outline"
                color={colors.greenDark}
                onPress={() => _saveNotice()}
              >
                Speichern
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
      <View style={styles.main}>
        <FlatList
          data={notice}
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
