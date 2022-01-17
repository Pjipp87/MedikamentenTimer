import React from "react";
import { StyleSheet, View, FlatList, useWindowDimensions } from "react-native";
import { Button, Text, Headline, Title } from "react-native-paper";

export const DoctorsScreen = ({ navigation }) => {
  const doctors = [
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
  ];

  const ListItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 15 }}>
        <Headline>{`${item.name}`}</Headline>
        <Text>{`${item.specialist}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <Text>Ärzte</Text>
      <FlatList
        data={doctors}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
        style={{ width: useWindowDimensions().width, paddingHorizontal: 25 }}
      />
      <Button onPress={() => navigation.navigate("Willkommen")}>Zurück</Button>
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
