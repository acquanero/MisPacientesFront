import {
    Body,
    Card,
    CardItem,
    Container,
    Content,
    Text,
    Textarea,
    Form,
} from "native-base";
import { StyleSheet, ScrollView, View, Button, TextInput } from 'react-native';
import React, { useEffect, useState } from "react";
import API from "../api";
import { LoadingSpinner, GenericList } from "../components";

const CreateEvolutionScreen = ({ navigation }) => {

    const id = navigation.getParam("id", null);
    
    const [state, setState] = useState({
        idMedico: "123",
        idPaciente: id,
        fecha: Date.now(),
        motivoConsulta: "",
        descripcion: "",
      });

    const { idMedico, idPaciente, fecha, motivoConsulta, descripcion } = state;

    async function cargarEvolucion() {
        try {
            console.log("antes")
            const response = await API.post("/evoluciones", {
                idMedico,
                idPaciente,
                fecha,
                motivoConsulta,
                descripcion,
            });
            console.log(response)
            console.log("despues")
        } catch (error) {
            console.error(error);
            alert("Hubo un error en la carga")
        } finally {
            alert("Datos cargados")
            navigation.goBack()
        }
    }

  function prueba() {
        console.log(motivoConsulta + "-" + descripcion + "-" + fecha + "El id: " + id)
        navigation.goBack()
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
                                onChangeText={(text) => setState({ ...state, motivoConsulta: text })}
                                />
                            </Form>
                            <Text> </Text>
                            <Form>
                                <Text style={styles.title}>Descripcion:</Text>
                                <Textarea
                                style={styles.inputDescripcion} 
                                placeholder="descripción" 
                                onChangeText={(text) => setState({ ...state, descripcion: text })}
                                />
                            </Form>
                            <View style={styles.cajaBoton}>
                                <Button 
                                title="Guardar"
                                onPress={()=>{cargarEvolucion()}}
                                />
                            </View>

                        </Body>
                    </CardItem>
                </Card>

            </Content>
        </ScrollView>
    );
}

CreateEvolutionScreen.navigationOptions = {
    title: "Crear evolucion",
};

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
    },
    title: {
        fontSize: 18,
        textDecorationLine: 'underline'
    },
    inputMotivo:{
        height:38,
        paddingTop:20,
        borderBottomColor: '#ccc',
        borderWidth:1,
        width: 350,
      },
      inputDescripcion:{
        paddingTop:20,
        borderBottomColor: '#ccc',
        borderWidth:1,
        width: 350,
        height:150,
      },
      cajaBoton:{
          paddingTop:10,
      }
});

export default CreateEvolutionScreen;