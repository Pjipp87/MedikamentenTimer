import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
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
} from "react-native-paper";
import { useWindowDimensions } from "react-native";

const optionsPerPage = [2, 3, 4];

export const MedicationScreen = ({ navigation }) => {
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

  const _addToArray = () => {
    let tempArray = MedikamenteArray;
    tempArray.push({
      name: medikament,
      dosierung: dosierung,
      einnahme: einnahme,
    });
    setMedikamenteArray((array) => [...array]);
    setDosierung("");
    setMedikament("");
    setEinnahme("");
    toggleModalVisibale();
  };

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={styles.main}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: useWindowDimensions().width,
        }}
      >
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
                <TextInput
                  label="Einnahme"
                  value={einnahme}
                  onChangeText={(einnahme) => setEinnahme(einnahme)}
                  style={{ marginVertical: 20 }}
                  activeUnderlineColor={colors.greenDark}
                />
                <TextInput
                  label="Dosierung"
                  value={dosierung}
                  onChangeText={(dosierung) => setDosierung(dosierung)}
                  activeUnderlineColor={colors.greenDark}
                />
              </View>
              <Button
                mode="contained"
                icon="keyboard-backspace"
                color={colors.greenDark}
                onPress={() => _addToArray()}
              >
                Speichern
              </Button>
            </View>
          </Modal>
        </Portal>

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
          <DataTable style={{ width: "100%" }}>
            <DataTable.Header>
              <DataTable.Title>Medikament</DataTable.Title>
              <DataTable.Title numeric>Einnahme</DataTable.Title>
              <DataTable.Title numeric>Dosierung/Einnahme</DataTable.Title>
            </DataTable.Header>
            {MedikamenteArray.map((element) => {
              return (
                <DataTable.Row>
                  <DataTable.Cell>{element.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{element.einnahme}</DataTable.Cell>
                  <DataTable.Cell numeric>{element.dosierung}</DataTable.Cell>
                </DataTable.Row>
              );
            })}

            <DataTable.Pagination
              page={page}
              numberOfPages={3}
              onPageChange={(page) => setPage(page)}
              label="1-2 of 6"
              optionsPerPage={optionsPerPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              showFastPagination
              optionsLabel={"Rows per page"}
            />
          </DataTable>
        )}
      </View>
      <Provider>
        <Portal>
          <FAB.Group
            open={open}
            icon={open ? "backup-restore" : "plus"}
            actions={[
              {
                icon: "minus",
                label: "Entfernen",
                onPress: () => console.log("Entfernen gedrückt"),
                small: false,
              },
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
      <Button
        mode="contained"
        icon="keyboard-backspace"
        color={colors.greenDark}
        onPress={() => navigation.navigate("Willkommen")}
        style={{ marginVertical: 40 }}
      >
        Zurück
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
