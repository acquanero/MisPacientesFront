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

const ModifyPatientScreen = ({ navigation }) => {

    //recibo de la pantalla anterior los datos del paciente que voy a modificar
    const patient = navigation.getParam("paciente", null);
    const {
        _id,
        nombre,
        apellido,
        dni,
        fechaNacimiento,
        obraSocial,
        plan,
        numAfiliado,
        telefono,
        antecedentes,
        medicacionHabitual,
        alergias,
        cirugias,
      } = patient;

    //seteo el estado con los valores que recibí
    const [state, setState] = useState({
        _id: _id,
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        fechaNacimiento: fechaNacimiento,
        obraSocial: obraSocial,
        plan: plan,
        numAfiliado: numAfiliado,
        telefono: telefono,
        antecedentes: antecedentes,
        medicacionHabitual: medicacionHabitual,
        alergias: alergias,
        cirugias: cirugias,
      });

    async function updatePaciente() {

        const {
            _id,
            nombre,
            apellido,
            dni,
            fechaNacimiento,
            obraSocial,
            plan,
            numAfiliado,
            telefono,
            antecedentes,
            medicacionHabitual,
            alergias,
            cirugias,
          } = state;

        try {
            const response = await API.put(`/pacientes/${_id}`, {
                _id,
                nombre,
                apellido,
                dni,
                fechaNacimiento,
                obraSocial,
                plan,
                numAfiliado,
                telefono,
                antecedentes,
                medicacionHabitual,
                alergias,
                cirugias,
            });
            // Mensaje de exito
            Toast.show({
                text: "Paciente modificado!",
                buttonText: "Ok",
                type: "success",
                duration: 3000,
            });
            // Se le pasa el parametro refresh en true para que en PatientScreen se recargue.
            navigation.navigate("Patient", { id: _id, refresh: Math.random() });
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
                        <Text style={styles.header}>Modificar Paciente</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Form>
                                <Text style={styles.title}>Nombre:</Text>
                                <Textarea
                                    style={styles.inputMotivo}
                                    defaultValue={nombre}
                                    onChangeText={(text) =>
                                        setState({ ...state, nombre: text })
                                    }
                                />
                            </Form>
                            <Text> </Text>
                            <Form>
                                <Text style={styles.title}>Apellido:</Text>
                                <Textarea
                                    style={styles.inputMotivo}
                                    defaultValue={apellido}
                                    onChangeText={(text) =>
                                        setState({ ...state, apellido: text })
                                    }
                                />
                            </Form>
                            <Text> </Text>
                            <Form>
                                <Text style={styles.title}>DNI:</Text>
                                <Textarea
                                    style={styles.inputMotivo}
                                    defaultValue={dni}
                                    onChangeText={(text) =>
                                        setState({ ...state, dni: text })
                                    }
                                />
                            </Form>
                            <Text> </Text>
                            <Form>
                                <Text style={styles.title}>Fecha de nacimiento:</Text>
                                <Textarea
                                    style={styles.inputMotivo}
                                    defaultValue={fechaNacimiento}
                                    onChangeText={(text) =>
                                        setState({ ...state, fechaNacimiento: text })
                                    }
                                />
                            </Form>
                            <Text> </Text>
                            <Form>
                                <Text style={styles.title}>Obra social:</Text>
                                <Textarea
                                    style={styles.inputMotivo}
                                    defaultValue={obraSocial}
                                    onChangeText={(text) =>
                                        setState({ ...state, obraSocial: text })
                                    }
                                />
                            </Form>
                            <Text> </Text>
                            <Form>
                                <Text style={styles.title}>Plan:</Text>
                                <Textarea
                                    style={styles.inputMotivo}
                                    defaultValue={plan}
                                    onChangeText={(text) =>
                                        setState({ ...state, plan: text })
                                    }
                                />
                            </Form>
                            <Text> </Text>
                            <Form>
                                <Text style={styles.title}>N° afiliado:</Text>
                                <Textarea
                                    style={styles.inputMotivo}
                                    defaultValue={numAfiliado}
                                    onChangeText={(text) =>
                                        setState({ ...state, numAfiliado: text })
                                    }
                                />
                            </Form>
                            <Text> </Text>
                            <Form>
                                <Text style={styles.title}>Telefono:</Text>
                                <Textarea
                                    style={styles.inputMotivo}
                                    defaultValue={telefono}
                                    onChangeText={(text) =>
                                        setState({ ...state, telefono: text })
                                    }
                                />
                            </Form>
                            <Text> </Text>
                            <Form>
                                <Text style={styles.title}>Antecedentes:</Text>
                                <Textarea
                                    style={styles.inputMotivo}
                                    defaultValue={antecedentes[0]}
                                    onChangeText={(text) =>
                                        setState({ ...state, antecedentes: [text] })
                                    }
                                />
                            </Form>
                            <Text> </Text>
                            <Form>
                                <Text style={styles.title}>Medicacion Habitual:</Text>
                                <Textarea
                                    style={styles.inputMotivo}
                                    defaultValue={medicacionHabitual[0]}
                                    onChangeText={(text) =>
                                        setState({ ...state, medicacionHabitual: [text] })
                                    }
                                />
                            </Form>
                            <Text> </Text>
                            <Form>
                                <Text style={styles.title}>Alergias:</Text>
                                <Textarea
                                    style={styles.inputMotivo}
                                    defaultValue={alergias[0]}
                                    onChangeText={(text) =>
                                        setState({ ...state, alergias: [text] })
                                    }
                                />
                            </Form>
                            <Text> </Text>
                            <Form>
                                <Text style={styles.title}>Cirugias:</Text>
                                <Textarea
                                    style={styles.inputMotivo}
                                    defaultValue={cirugias[0]}
                                    onChangeText={(text) =>
                                        setState({ ...state, cirugias: [text] })
                                    }
                                />
                            </Form>
                            <Text> </Text>
                            <View style={styles.cajaBoton}>
                                <Button
                                    primary
                                    style={styles.estiloBoton}
                                    onPress={() => {
                                        updatePaciente();
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

ModifyPatientScreen.navigationOptions = {
    title: "Modificar Paciente",
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

export default ModifyPatientScreen;