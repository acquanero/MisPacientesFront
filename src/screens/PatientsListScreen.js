import React, { useEffect, useState } from "react";
import { Block, Text } from "../components";
import TabBarIcon from "../components/TabBarIcon";
import API from "../api";
import { Container, Content, List, ListItem } from "native-base";

import { Alert } from "react-native";
import LoadingSpinner from "../components/LoadingSpinner";

function PatientsListScreen({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getPatients() {
      try {
        setLoading(true);
        const response = await API.get("/pacientes");
        console.log(response.data);
        setPatients(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getPatients();
  }, []);

  const openPatient = (id) => {
    //  Alert.alert("Click en : ", id);
    navigation.navigate("Patient", { id });
  };

  const renderPatientsList = () => {
    if (!patients || patients.length === 0) {
      if (loading) {
        return <LoadingSpinner show={loading} />;
      }
      return <Text h3>No hay resultados</Text>;
    }

    return (
      <List>
        {patients.map(({ _id, idPaciente, nombre, apellido }) => {
          return (
            <ListItem
              key={_id}
              button
              onPress={() => {
                openPatient(idPaciente);
              }}
            >
              <Text>
                {nombre} {apellido}
              </Text>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <Container>
      <Content>{renderPatientsList()}</Content>
    </Container>
  );
}

PatientsListScreen.navigationOptions = {
  title: "Pacientes",
};

export default PatientsListScreen;
