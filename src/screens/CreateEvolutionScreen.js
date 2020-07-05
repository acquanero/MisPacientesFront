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
import { StyleSheet, ScrollView, View, Button } from 'react-native';
import React, { useEffect, useState } from "react";
import API from "../api";
import { LoadingSpinner, GenericList } from "../components";

const CreateEvolutionScreen = ({ navigation }) => {
    const [active, setActive] = useState(false);
    const [descripcion, setDescripcion] = useState("");
    const [motivo, setMotivo] = useState("");

    async function cargarEvolucion() {
        try {
          setLoading(true);
          const response = await API.post("/evoluciones");
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }

      function prueba(){
          console.log({motivo} + "-"  + {descripcion} )
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
                                rowSpan={1} 
                                bordered 
                                placeholder="motivo de consulta"
                                onChangeText={(text) => {
                                    setMotivo(text)
                                }}
                                />
                            </Form>
                            <Text> </Text>
                            <Form>
                                <Text style={styles.title}>Descripcion:</Text>
                                <Textarea 
                                style={styles.inputDescripcion} 
                                rowSpan={5} 
                                bordered 
                                placeholder="descripción" 
                                textBreakStrategy="balanced"
                                onChangeText={(text) => {
                                    setDescripcion(text)
                                }}
                                />
                            </Form>
                            <View style={styles.cajaBoton}>
                                <Button 
                                title="Guardar"
                                onPress={()=>{prueba()}}
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