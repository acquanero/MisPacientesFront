import { Container, Content, List, ListItem, Text, Toast, Button, Fab, Icon } from "native-base";
import React, { useEffect, useState } from "react";
import API from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import ToolbarActions from "../components/ToolbarActions";
import { formatDateTime, formatDateShift } from "../utils/dates";

function ShiftsListScreen({ navigation }) {

  const fechaRecibida = navigation.getParam("date", null);

  const [date, setDate] = useState(formatDateShift(fechaRecibida));
  const [shiftList, setShiftList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(fechaRecibida)
  
    if (fechaRecibida) {
      setDate(formatDateShift(fechaRecibida, "YYYY-MM-DD"));
    } else {
      setDate(formatDateShift());
    }
  }, [navigation]);
  

  useEffect(() => {
    async function getShiftList() {
      try {
        setLoading(true);
        const response = await API.get(`/turnos/dia/${date}`);

        setShiftList(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getShiftList();
  }, []);

  const goToCreateAppointment = () => {
    navigation.navigate("CreateAppointment");
  };

  const openShift = (id) => {
    navigation.navigate("Shift", { id });
  };

  const renderShiftList = () => {
    if (!shiftList || shiftList.length === 0) {
      if (loading) {
        return <LoadingSpinner show={loading} />;
      }
      return <Text>No hay resultados</Text>;
    }

    return (
      <List>
        {shiftList.map(({ _id, fecha, motivoConsulta, NombrePaciente }) => {
          const shiftDate = formatDateTime(fecha);

          return (
            <ListItem
              key={_id}
              button
              onPress={() => {
                openShift(_id);
              }}
            >
              <Text>
                {shiftDate} - {NombrePaciente} - {motivoConsulta}
              </Text>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <Container>
      <Content>{renderShiftList()}</Content>
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

ShiftsListScreen.navigationOptions = {
  title: "Turnos",
  headerRight: () => <ToolbarActions />,
};

export default ShiftsListScreen;
