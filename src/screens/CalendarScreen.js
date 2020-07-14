import { Container, Fab, Icon } from "native-base";
import React from "react";
import { Calendar } from "react-native-calendars";
import ToolbarActions from "../components/ToolbarActions";

function CalendarScreen({ navigation }) {

  const goToCreateAppointment = () => {
    navigation.navigate("CreateAppointment");
  };

  return (
    <Container>
      <Calendar
        onDayPress={({ dateString }) => {
          navigation.push("ShiftsList", { date: dateString });
        }}
      />
      <Fab direction="up"
        containerStyle={{}}
        style={{ backgroundColor: '#5067FF' }}
        position="bottomRight"
        onPress={() => {
          goToCreateAppointment();
        }}
      >
        <Icon name="add" />
      </Fab>
    </Container>
  );
}

CalendarScreen.navigationOptions = {
  title: "Calendario",
  headerRight: () => <ToolbarActions />,
};

export default CalendarScreen;
