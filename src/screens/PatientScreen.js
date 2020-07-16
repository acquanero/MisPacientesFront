import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Fab,
  Icon,
  Text,
  Toast,
} from "native-base";
import React, { useEffect, useState } from "react";
import {Alert} from "react-native";
import API from "../api";
import { LoadingSpinner, GenericList } from "../components";
import { formatDate } from "../utils/dates";

function PatientScreen({ navigation }) {
  const id = navigation.getParam("id", null);
  const [active, setActive] = useState(false);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getPatient() {
      try {
        setLoading(true);
        const response = await API.get(`/pacientes/${id}`);

        setPatient(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getPatient();
  }, []);

  function openEvolutionList() {
    navigation.navigate("EvolutionList", { id });
  }

  async function deletePatient() {

    const {
      _id,
      nombre,
      apellido,
      dni,
      fechaNacimiento,
      obraSocial,
      plan,
      numAfiliado,
      antecedentes,
      medicacionHabitual,
      alergias,
      cirugias,
    } = patient;

    try {
        setLoading(true);
        const response = await API.delete(`/pacientes/${_id}`);
        console.log(response)
        Toast.show({
            text: "Paciente eliminado",
            buttonText: "Ok",
            type: "success",
            duration: 3000,
          });
    } catch (error) {
        console.error(error);
        Toast.show({
            text: "Ocurrió un error al eliminar",
            buttonText: "Ok",
            type: "danger",
            duration: 3000,
        });
    } finally {
        navigation.navigate("PatientsList", { refresh: true });
    }
}

  const goToDelete = () => {
    Alert.alert(
        "Eliminar Paciente",
        "¿Estas seguro que desea eliminar el paciente?",
        [
            {
                text: "No",
                style: "cancel",
            },
            { text: "Si", onPress: deletePatient },
        ],
        { cancelable: false }
    );
};

  const renderPatientInfo = () => {
    if (!patient) {
      if (loading) {
        return <LoadingSpinner show={loading} />;
      }
      return <Text>No hay resultados</Text>;
    }
    const {
      nombre,
      apellido,
      dni,
      fechaNacimiento,
      obraSocial,
      plan,
      numAfiliado,
      antecedentes,
      medicacionHabitual,
      alergias,
      cirugias,
    } = patient;

    const birthday = formatDate(fechaNacimiento);

    return (
      <React.Fragment>
        <Card>
          <CardItem header bordered>
            <Text>Info del paciente</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>Nombre: {nombre}</Text>
              <Text>Apellido: {apellido}</Text>
              <Text>DNI: {dni}</Text>
              <Text>Fecha de Nacimiento: {birthday}</Text>
              <Text>Obra Social: {obraSocial}</Text>
              <Text>Plan: {plan}</Text>
              <Text>Nº Afiliado: {numAfiliado}</Text>
            </Body>
          </CardItem>

          <CardItem header bordered>
            <Text>Antecedentes</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <GenericList list={antecedentes} />
            </Body>
          </CardItem>

          <CardItem header bordered>
            <Text> Medicación Habitual </Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <GenericList list={medicacionHabitual} />
            </Body>
          </CardItem>

          <CardItem header bordered>
            <Text>Alergias</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <GenericList list={alergias} />
            </Body>
          </CardItem>

          <CardItem header bordered>
            <Text>Cirugías</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <GenericList list={cirugias} />
            </Body>
          </CardItem>
        </Card>
      </React.Fragment>
    );
  };

  return (
    <Container>
      <Content>{renderPatientInfo()}</Content>
      {/* Menu de opciones */}
      <Fab
        active={active}
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: "#5067FF" }}
        position="bottomRight"
        onPress={() => setActive(!active)}
      >
        <Icon name="more" />
        <Button
          style={{ backgroundColor: "#3B5998" }}
          onPress={() => {
            openEvolutionList();
          }}
        >
          <Icon type="Feather" name="clipboard" />
        </Button>
        <Button style={{ backgroundColor: "#34A34F" }}>
          <Icon type="FontAwesome" name="pencil" />
        </Button>
        <Button
          style={{ backgroundColor: "#DD5144" }}
          onPress={() => {
            goToDelete();
        }}
        >
          <Icon type="Feather" name="trash" />
        </Button>
      </Fab>
    </Container>
  );
}

PatientScreen.navigationOptions = {
  title: "Paciente",
};

export default PatientScreen;
