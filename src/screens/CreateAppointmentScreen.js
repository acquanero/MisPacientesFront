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
import { Calendar } from "react-native-calendars";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import API from "../api";

const CreateAppointmentScreen = ({ navigation }) => {

    const [state, setState] = useState({
        NombrePaciente: "",
        TelefonoPaciente: "",
        dia: Date.now(),
        motivoConsulta: "",
        hora: "00:00"
    });

    const { NombrePaciente, TelefonoPaciente, dia, motivoConsulta, hora } = state;

    const prueba = () => {
        console.log(dia + "T" + hora + ":00")
    }

    async function cargarTurno() {

        const fecha = dia + "T" + hora + ":00";

        try {
            const response = await API.post("/turnos", {
                NombrePaciente,
                TelefonoPaciente,
                fecha,
                motivoConsulta,
            });
            // Mensaje de exito
            Toast.show({
                text: "Turno guardado!",
                buttonText: "Ok",
                type: "success",
                duration: 3000,
            });
            // Se le pasa el parametro refresh en true para que en EvolutionListScreen se recargue el listado.
            navigation.navigate("Calendar");
        } catch (error) {
            console.error(error);
            // Mensaje de error
            Toast.show({
                text: "Ocurrió un error al guardar el turno!",
                buttonText: "Ok",
                type: "danger",
                duration: 3000,
            });
        }
    }

    return (
        <ScrollView>
            <Content>
                <Calendar
                    onDayPress={({ dateString }) => {
                        setState({ ...state, dia: dateString });
                    }}
                />
                <Card>
                    <CardItem header bordered>
                        <Text style={styles.header}>Datos</Text>
                    </CardItem>
                    <CardItem>

                        <Body>
                        <Form>
                                <Text style={styles.title}>Hora:</Text>
                                <Textarea
                                    style={styles.inputDato}
                                    placeholder="hora (formato HH:mm)"
                                    onChangeText={(text) =>
                                        setState({ ...state, hora: text })
                                    }
                                />
                            </Form>
                            <Text> </Text>
                            <Form>
                                <Text style={styles.title}>Nombre:</Text>
                                <Textarea
                                    style={styles.inputDato}
                                    placeholder="nombre"
                                    onChangeText={(text) =>
                                        setState({ ...state, NombrePaciente: text })
                                    }
                                />
                            </Form>
                            <Text> </Text>
                            <Form>
                                <Text style={styles.title}>Motivo de Consulta:</Text>
                                <Textarea
                                    style={styles.inputDato}
                                    placeholder="motivo de consulta"
                                    onChangeText={(text) =>
                                        setState({ ...state, motivoConsulta: text })
                                    }
                                />
                            </Form>
                            <Text> </Text>
                            <Form>
                                <Text style={styles.title}>Telefono:</Text>
                                <Textarea
                                    style={styles.inputDato}
                                    placeholder="telefono"
                                    onChangeText={(text) =>
                                        setState({ ...state, TelefonoPaciente: text })
                                    }
                                />
                            </Form>
                            <View style={styles.cajaBoton}>
                                <Button
                                    primary
                                    style={styles.estiloBoton}
                                    onPress={() => {
                                        cargarTurno();
                                    }}
                                >
                                    <Text>Guardar</Text>
                                </Button>
                                <Button
                                    danger
                                    onPress={() => {
                                        navigation.goBack();
                                    }}
                                >
                                    <Text>Cancelar</Text>
                                </Button>
                            </View>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
        </ScrollView>
    );
};
  
  CreateAppointmentScreen.navigationOptions = {
    title: "Crear turno",
  };
  
  const styles = StyleSheet.create({
    header: {
      fontSize: 24,
    },
    title: {
      fontSize: 18,
      textDecorationLine: "underline",
    },
    inputDato: {
      height: 38,
      paddingTop: 20,
      borderBottomColor: "#ccc",
      borderWidth: 1,
      width: 350,
    },
    cajaBoton: {
        flexDirection: "row",
        alignContent: "center",
        paddingTop: 10,
    },
    estiloBoton: {
        marginRight:20,
    }
  });
  
  export default CreateAppointmentScreen;
  