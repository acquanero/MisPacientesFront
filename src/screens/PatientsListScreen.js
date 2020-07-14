import { Content, Fab, Icon, List, ListItem, Text } from "native-base";
import React, { useEffect, useState } from "react";
import API from "../api";
import { LoadingSpinner, ToolbarActions } from "../components";
import { AsyncStorage } from "react-native";

function PatientsListScreen({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPatients() {
      try {
        setLoading(true);
        const response = await API.get("/pacientes/medico/by-id");
        console.log(response.data)
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
    navigation.navigate("Patient", { id });
  };

  const renderPatientsList = () => {
    if (!patients || patients.length === 0) {
      if (loading) {
        return <LoadingSpinner show={loading} />;
      }
      return <Text>No hay resultados</Text>;
    }

    return (
      <List>
        {patients.map(({ _id, nombre, apellido }) => {
          return (
            <ListItem
              key={_id}
              button
              onPress={() => {
                openPatient(_id);
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
    <React.Fragment>
      <Content>{renderPatientsList()}</Content>
      <Fab
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: "#5067FF" }}
        position="bottomRight"
      >
        <Icon name="add" />
      </Fab>
    </React.Fragment>
  );
}

PatientsListScreen.navigationOptions = {
  title: "Pacientes",
  headerRight: () => <ToolbarActions />,
};

export default PatientsListScreen;
