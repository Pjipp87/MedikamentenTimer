import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainController from "./src/controller/mainController";

export default function App() {
  return (
    <>
      <MainController></MainController>
      <StatusBar />
    </>
  );
}
