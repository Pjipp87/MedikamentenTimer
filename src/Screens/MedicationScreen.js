import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button, useTheme, List } from "react-native-paper";
import { useWindowDimensions } from "react-native";

import { DataTable } from "react-native-paper";

const optionsPerPage = [2, 3, 4];

export const MedicationScreen = ({ navigation }) => {
  //##########################
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const Medis = [
    {
      name: "Aspirin",
      einnahme: "1-0-1",
      dosierung: "1 Tablette",
      id: 1,
    },
    {
      name: "Grippostad",
      einnahme: "1-1-1",
      dosierung: "2 Tabetten",
      id: 2,
    },
    {
      name: "Flunitrazepan",
      einnahme: "0-0-1",
      dosierung: "2 Tabletten",
      id: 3,
    },
  ];

  const { colors } = useTheme();
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
        <Text>Medikation</Text>
        <DataTable style={{ width: "100%" }}>
          <DataTable.Header>
            <DataTable.Title>Medikament</DataTable.Title>
            <DataTable.Title numeric>Einnahme</DataTable.Title>
            <DataTable.Title numeric>Dosierung/Einnahme</DataTable.Title>
          </DataTable.Header>
          {Medis.map((element) => {
            return (
              <DataTable.Row>
                <DataTable.Cell>{element.name}</DataTable.Cell>
                <DataTable.Cell numeric>237</DataTable.Cell>
                <DataTable.Cell numeric>8.0</DataTable.Cell>
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
      </View>
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
