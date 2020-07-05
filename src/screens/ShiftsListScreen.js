import { Container, Content, List, ListItem, Text, Toast } from "native-base";
import React, { useEffect, useState } from "react";
import API from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import ToolbarActions from "../components/ToolbarActions";
import { formatDateTime, formatDate } from "../utils/dates";

function ShiftsListScreen({ navigation }) {
  const [date, setDate] = useState(formatDate());

  useEffect(() => {
    const filteredDate = navigation.getParam("date", null);

    if (filteredDate) {
      setDate(formatDate(filteredDate, "YYYY-MM-DD"));
    } else {
      setDate(formatDate());
    }
  }, [navigation]);

  const [shiftList, setShiftList] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getShiftList() {
      try {
        setLoading(true);
        const response = await API.get(`/turnos`);

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
        {shiftList.map(({ _id, fecha, motivoConsulta }) => {
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
                {shiftDate} {motivoConsulta}
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
