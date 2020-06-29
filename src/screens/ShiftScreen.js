import React, { useEffect, useState } from "react";
import { Block } from "../components";
import API from "../api";
import {
  Container,
  Content,
  Card,
  CardItem,
  List,
  ListItem,
  Text,
  Body,
  Title,
} from "native-base";
import LoadingSpinner from "../components/LoadingSpinner";

function ShiftScreen({ navigation }) {
  const id = navigation.getParam("id", null);

  const [shift, setShift] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getShift() {
      try {
        setLoading(true);
        const response = await API.get(`/turnos/${id}`);

        console.log("------------c------------------");
        console.log(response.data);
        console.log("---------------x---------------");

        setShift(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getShift();
  }, []);

  const renderShift = () => {
    if (!shift) {
      if (loading) {
        return <LoadingSpinner show={loading} />;
      }
      return <Text h3>No hay Turno</Text>;
    }
    const { fecha, motivoConsulta } = shift;
    return (
      <React.Fragment>
        <Card>
          <CardItem header bordered>
            <Text h3>Info del turno</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>Fecha: {fecha}</Text>
              <Text>Motivo de Consulta: {motivoConsulta}</Text>
            </Body>
          </CardItem>
        </Card>
      </React.Fragment>
    );
  };

  return (
    <Container>
      <Content>{renderShift()}</Content>
    </Container>
  );
}

ShiftScreen.navigationOptions = {
  title: "Turno",
};

export default ShiftScreen;
