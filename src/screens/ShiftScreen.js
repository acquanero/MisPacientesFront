import { Body, Card, CardItem, Container, Content, Text } from "native-base";
import React, { useEffect, useState } from "react";
import API from "../api";
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
