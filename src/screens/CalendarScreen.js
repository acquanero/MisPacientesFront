import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default function CalendarScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Calendar />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    paddingTop: 15,
  },
});

CalendarScreen.navigationOptions = {
  title: "Calendario",
};
