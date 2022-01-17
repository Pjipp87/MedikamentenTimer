import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import {
  Button,
  useTheme,
  FAB,
  Portal,
  Provider,
  DataTable,
  Modal,
  TextInput,
  Headline,
  Title,
  Dialog,
  Paragraph,
  IconButton,
} from "react-native-paper";
import { useWindowDimensions } from "react-native";
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

const optionsPerPage = [2, 3, 4];

export const MedicationScreen = ({ navigation }) => {
  const { user } = useContext(Context);
  //##########################
  const { colors } = useTheme();
  const [fabState, setFabState] = useState({ open: false });
  const onFabStateChange = ({ open }) => setFabState({ open });
  const { open } = fabState;
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisibale = () => setModalVisible(!modalVisible);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [medikament, setMedikament] = useState("");
  const [einnahme, setEinnahme] = useState("");
  const [dosierung, setDosierung] = useState("");
  const [MedikamenteArray, setMedikamenteArray] = useState([]);
  const containerStyle = { backgroundColor: colors.accent, padding: 20 };
  const [alertVisible, setAlertVisible] = React.useState(false);
  const [MedikamentToDelete, setMedikamentToDelete] = useState("");
  const _toggleAlert = (item) => {
    setMedikamentToDelete(item);
    setAlertVisible(!alertVisible);
  };

  const { userName } = user.email;

  useEffect(() => {
    _getFromMedikamenteFromFirestore();
    console.log(userName);
  }, [!MedikamenteArray]);

  const [morgens, setMorgens] = useState(0);
  const [mittags, setMittags] = useState(0);
  const [abends, setAbends] = useState(0);

  const _deleteInFirestore = async (item) => {
    console.log("#######################################", medikament);
    console.log("#######################################", user.email);
    await deleteDoc(doc(db, "User", `${user.email}`, `Medikamente`, `${item}`));
  };

  const _addToArray = () => {
    const medikamentFirebase = {
      name: medikament,
      dosierung: dosierung,
      morgens: morgens,
      mittags: mittags,
      abends: abends,
      id: uuidv4(),
    };
    _setMedikamentInFirebase(medikamentFirebase);
    let tempArray = MedikamenteArray;
    tempArray.push(medikamentFirebase);

    setMedikamenteArray((array) => [...array]);
    setDosierung("");
    setMedikament("");
    setMorgens(0);
    setMittags(0);
    setAbends(0);
    toggleModalVisibale();
  };

  const _removeFromArray = async (item) => {
    const tempArray = MedikamenteArray;
    console.log(tempArray);
    const index = tempArray.findIndex((index) => index.name === item);
    console.log(index);
    tempArray.splice(index, 1);
    setMedikamenteArray((array) => [...array], tempArray);
    _deleteInFirestore(item);

    setMedikamentToDelete("");
    setAlertVisible(!alertVisible);
  };

  const _setMedikamentInFirebase = async (medikament) => {
    //console.log(user);
    await setDoc(
      doc(db, "User", `${user.email}`, `Medikamente`, `${medikament.name}`),
      {
        name: medikament.name,
        dosierung: medikament.dosierung,
        morgens: medikament.morgens,
        mittags: medikament.mittags,
        abends: medikament.abends,
        id: medikament.id,
      }
    );
  };

  const _getFromMedikamenteFromFirestore = async () => {
    let tempArray = [];
    const querySnapshot = await getDocs(
      collection(db, "User", `${user.email}`, `Medikamente`)
    );
    querySnapshot.forEach((doc) => {
      tempArray.push(doc.data());
    });
    setMedikamenteArray(tempArray);
  };

  return (
    <>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={toggleModalVisibale}
          contentContainerStyle={containerStyle}
        >
          <View>
            <Title>Bitte Medikament eingeben...</Title>
            <View style={{ marginVertical: 40 }}>
              <TextInput
                label="Name des Medikaments"
                value={medikament}
                onChangeText={(medikament) => setMedikament(medikament)}
                activeUnderlineColor={colors.greenDark}
              />

              <Headline style={{ paddingVertical: 10, textAlign: "center" }}>
                Dosierung
              </Headline>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Headline>Morgens</Headline>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Button
                    onPress={() => {
                      let number = morgens;
                      if (number > 0) {
                        number--;
                      }
                      setMorgens(number);
                    }}
                    labelStyle={{ fontSize: 36 }}
                  >
                    -
                  </Button>
                  <Headline style={{ fontWeight: "bold" }}>{morgens}</Headline>
                  <Button
                    onPress={() => {
                      let number = morgens;
                      number++;
                      setMorgens(number);
                    }}
                    labelStyle={{ fontSize: 30 }}
                  >
                    +
                  </Button>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Headline>Mittags</Headline>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Button
                    onPress={() => {
                      let number = mittags;
                      if (number > 0) {
                        number--;
                      }
                      setMittags(number);
                    }}
                    labelStyle={{ fontSize: 30 }}
                  >
                    -
                  </Button>
                  <Headline style={{ fontWeight: "bold" }}>{mittags}</Headline>
                  <Button
                    onPress={() => {
                      let number = mittags;
                      number++;
                      setMittags(number);
                    }}
                    labelStyle={{ fontSize: 30 }}
                  >
                    +
                  </Button>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Headline>Abends</Headline>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Button
                    onPress={() => {
                      let number = abends;
                      if (number > 0) {
                        number--;
                      }
                      setAbends(number);
                    }}
                    labelStyle={{ fontSize: 36 }}
                  >
                    -
                  </Button>
                  <Headline style={{ fontWeight: "bold" }}>{abends}</Headline>
                  <Button
                    onPress={() => {
                      let number = abends;
                      number++;
                      setAbends(number);
                    }}
                    labelStyle={{ fontSize: 30 }}
                  >
                    +
                  </Button>
                </View>
              </View>
            </View>
            <Button
              mode="contained"
              icon="content-save-outline"
              color={colors.greenDark}
              onPress={() => _addToArray()}
            >
              Speichern
            </Button>
          </View>
        </Modal>
        <Dialog visible={alertVisible} onDismiss={_toggleAlert}>
          <Dialog.Title>Medikament löschen?</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Möchten Sie das Medikament {MedikamentToDelete} aus Ihrer Liste
              entfernen?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => _toggleAlert()} color={colors.greenDark}>
              Abbrechen
            </Button>
            <Button
              onPress={() => _removeFromArray(MedikamentToDelete)}
              color={colors.notification}
            >
              Löschen
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={styles.main}>
        <Headline>Medikation</Headline>
        {MedikamenteArray.length === 0 ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Headline style={{ marginVertical: 30 }}>
              Noch keine Einträge vorhanden
            </Headline>
            <Title
              style={{
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              Drücken Sie auf das "Plus" um einträge hinzuzufügen
            </Title>
          </View>
        ) : (
          <DataTable
            style={{
              width: "100%",

              paddingBottom: 100,
            }}
          >
            <DataTable.Header>
              <DataTable.Title numberOfLines={2}>
                <Title>Medikament</Title>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Title>Einnahme</Title>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Title>Dosierung</Title>
              </DataTable.Title>
            </DataTable.Header>

            <ScrollView>
              {MedikamenteArray.map((element) => {
                return (
                  <DataTable.Row
                    onPress={() => _toggleAlert(element.name)}
                    style={{
                      backgroundColor: colors.greenBright,
                      marginBottom: 10,
                    }}
                  >
                    <DataTable.Cell>
                      <Text style={{ fontWeight: "bold" }}>{element.name}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell
                      numeric
                    >{`${element.morgens} - ${element.mittags} - ${element.abends}`}</DataTable.Cell>
                    <DataTable.Cell numeric>{element.dosierung}</DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </ScrollView>
          </DataTable>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: useWindowDimensions().width,
            paddingHorizontal: 30,
          }}
        >
          <Button
            mode="contained"
            icon="keyboard-backspace"
            color={colors.greenDark}
            onPress={() => navigation.navigate("Willkommen")}
          >
            Zurück
          </Button>
          <IconButton
            icon="plus"
            color={colors.greenBright}
            size={40}
            onPress={() => toggleModalVisibale()}
            style={{ backgroundColor: colors.greenDark }}
          />
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

    marginTop: 75,
  },
});

/**
 *   <Provider>
          <Portal>
            <FAB.Group
              open={open}
              icon={open ? "backup-restore" : "plus"}
              actions={[
                {
                  icon: "plus",
                  label: "Hinzufügen",
                  onPress: () => toggleModalVisibale(),
                  small: false,
                },
              ]}
              onStateChange={onFabStateChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
            />
          </Portal>
        </Provider>
 */
