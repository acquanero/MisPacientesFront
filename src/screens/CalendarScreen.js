import { Container } from "native-base";
import React from "react";
import { Calendar } from "react-native-calendars";
import ToolbarActions from "../components/ToolbarActions";

function CalendarScreen({ navigation }) {
  return (
    <Container>
      <Calendar
        onDayPress={({ dateString }) => {
          navigation.push("ShiftsList", { date: dateString });
        }}
      />
    </Container>
  );
}

CalendarScreen.navigationOptions = {
  title: "Calendario",
  headerRight: () => <ToolbarActions />,
};

export default CalendarScreen;
