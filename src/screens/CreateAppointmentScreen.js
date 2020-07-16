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
        dia: "",
    });

    const { dia } = state;

    const goToNextStep = (dia) => {
        navigation.navigate("CreateAppointmentTwo", { dia });
    };

    return (
        <ScrollView>
            <Content>
                <CardItem header bordered>
                    <Text style={styles.header}>Seleccione la fecha:</Text>
                </CardItem>
                <Calendar
                    onDayPress={({ dateString }) => {
                        setState({ ...state, dia: dateString });
                        goToNextStep(dia);
                    }}
                />
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
  