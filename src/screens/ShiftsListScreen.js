import React, { useEffect, useState } from "react";
import { Block } from "../components";
import API from "../api";
import { List, ListItem, Text, Container, Content } from "native-base";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatDateTime } from "../utils/dates";

function ShiftsListScreen({ navigation }) {
  const id = navigation.getParam("id", null);

  const [shiftList, setShiftList] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getShiftList() {
      try {
        setLoading(true);
        const response = await API.get(`/turnos`);

        console.log("------------c------------------");
        console.log(response.data);
        console.log("---------------x---------------");

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
    //Alert.alert("Click en : ", id);
    navigation.navigate("Shift", { id });
  };

  const renderShiftList = () => {
    if (!shiftList || shiftList.length === 0) {
      if (loading) {
        return <LoadingSpinner show={loading} />;
      }
      return <Text h3>No hay resultados</Text>;
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
};

export default ShiftsListScreen;
