import {
  Body,
  Card,
  CardItem,
  Content,
  Form,
  Text,
  Textarea,
  Toast,
  Button,
} from "native-base";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import API from "../api";

const CreateEvolutionScreen = ({ navigation }) => {
  const id = navigation.getParam("id", null);

  const [state, setState] = useState({
    idPaciente: id,
    fecha: Date.now(),
    motivoConsulta: "",
    descripcion: "",
  });

  const { idMedico, idPaciente, fecha, motivoConsulta, descripcion } = state;

  async function cargarEvolucion() {
    try {
      const response = await API.post("/evoluciones", {
        idPaciente,
        fecha,
        motivoConsulta,
        descripcion,
      });
      // Mensaje de exito
      Toast.show({
        text: "Evolución guardada!",
        buttonText: "Ok",
        type: "success",
        duration: 3000,
      });
      // Se le pasa el parametro refresh en true para que en EvolutionListScreen se recargue el listado.
      navigation.navigate("EvolutionList", { id: idPaciente, refresh: true });
    } catch (error) {
      console.error(error);
      // Mensaje de error
      Toast.show({
        text: "Ocurrió un error al guardar!",
        buttonText: "Ok",
        type: "danger",
        duration: 3000,
      });
    }
  }

  return (
    <ScrollView>
      <Content>
        <Card>
          <CardItem header bordered>
            <Text style={styles.header}>Evolucion</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Form>
                <Text style={styles.title}>Motivo de Consulta:</Text>
                <Textarea
                  style={styles.inputMotivo}
                  placeholder="motivo de consulta"
                  onChangeText={(text) =>
                    setState({ ...state, motivoConsulta: text })
                  }
                />
              </Form>
              <Text> </Text>
              <Form>
                <Text style={styles.title}>Descripcion:</Text>
                <Textarea
                  style={styles.inputDescripcion}
                  placeholder="descripción"
                  onChangeText={(text) =>
                    setState({ ...state, descripcion: text })
                  }
                />
              </Form>
              <View style={styles.cajaBoton}>
                <Button
                  primary
                  onPress={() => {
                    cargarEvolucion();
                  }}
                >
                  <Text> Guardar </Text>
                </Button>
              </View>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </ScrollView>
  );
};

CreateEvolutionScreen.navigationOptions = {
  title: "Crear evolucion",
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
  },
  title: {
    fontSize: 18,
    textDecorationLine: "underline",
  },
  inputMotivo: {
    height: 38,
    paddingTop: 20,
    borderBottomColor: "#ccc",
    borderWidth: 1,
    width: 350,
  },
  inputDescripcion: {
    paddingTop: 20,
    borderBottomColor: "#ccc",
    borderWidth: 1,
    width: 350,
    height: 150,
  },
  cajaBoton: {
    paddingTop: 10,
  },
});

export default CreateEvolutionScreen;
