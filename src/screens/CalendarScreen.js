import React from "react";
import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { ScrollView } from "react-native-gesture-handler";
import ToolbarActions from "../components/ToolbarActions";

export default function CalendarScreen() {
  return (
    <ScrollView style={styles.container}>
      <Calendar />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

CalendarScreen.navigationOptions = {
  title: "Calendario",
  headerRight: () => <ToolbarActions />,
};
