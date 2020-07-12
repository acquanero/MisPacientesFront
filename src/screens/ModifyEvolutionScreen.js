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
    Row,
} from "native-base";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import API from "../api";

const ModifyEvolutionScreen = ({ navigation }) => {

    //recibo de la pantalla anterior los datos de la evolucion que voy a modificar
    const evolution = navigation.getParam("evolucion", null);
    const { _id, descripcion, fecha, idPaciente, motivoConsulta } = evolution;

    //seteo el estado con los valores que recibí
    const [state, setState] = useState({
        _id: _id,
        idPaciente: idPaciente,
        fecha: fecha,
        motivoConsulta: motivoConsulta,
        descripcion: descripcion,
      });

    async function updateEvolucion() {

        const { _id, idPaciente, fecha, motivoConsulta, descripcion} = state;

        try {
            const response = await API.put(`/evoluciones/${_id}`, {
                _id,
                idPaciente,
                fecha,
                motivoConsulta,
                descripcion,
            });
            // Mensaje de exito
            Toast.show({
                text: "Evolución modificada!",
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
                text: "Ocurrió un error al modificar!",
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
                                    defaultValue={motivoConsulta}
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
                                    defaultValue={descripcion}
                                    onChangeText={(text) =>
                                        setState({ ...state, descripcion: text })
                                    }
                                />
                            </Form>
                            <View style={styles.cajaBoton}>
                                <Button
                                    primary
                                    style={styles.estiloBoton}
                                    onPress={() => {
                                        updateEvolucion();
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

ModifyEvolutionScreen.navigationOptions = {
    title: "Modificar evolucion",
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
        flexDirection: "row",
        alignContent: "center",
        paddingTop: 10,
    },
    estiloBoton: {
        marginRight:20,
    }
});

export default ModifyEvolutionScreen;
