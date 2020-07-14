import { Container, Content, List, ListItem, Text, Toast, Button } from "native-base";
import React, { useEffect, useState } from "react";
import API from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import ToolbarActions from "../components/ToolbarActions";
import { formatDateTime, formatDateShift } from "../utils/dates";

function ShiftsListScreen({ navigation }) {
  const [date, setDate] = useState(formatDateShift());

  useEffect(() => {
    const filteredDate = navigation.getParam("date", null);

    if (filteredDate) {
      setDate(formatDateShift(filteredDate, "YYYY-MM-DD"));
    } else {
      setDate(formatDateShift());
    }
  }, [navigation]);

  const [shiftList, setShiftList] = useState(null);
  const [loading, setLoading] = useState(false);
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
                {shiftDate} - {motivoConsulta} - {NombrePaciente}
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
    </Container>
  );
}

ShiftsListScreen.navigationOptions = {
  title: "Turnos",
  headerRight: () => <ToolbarActions />,
};

export default ShiftsListScreen;
