import React, { useEffect, useState } from "react";
import { Block } from "../components";
import API from "../api";
import {
  Container,
  Content,
  Card,
  CardItem,
  List,
  ListItem,
  Text,
  Body,
  Title,
} from "native-base";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatDate } from "../utils/dates";

const GenericList = ({ list }) => {
  if (!list || list.length === 0) {
    return <Text> Sin datos </Text>;
  }
  return list.map((item) => {
    return <Text key={item}>{item}</Text>;
  });
};

function PatientScreen({ navigation }) {
  const id = navigation.getParam("id", null);

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getPatient() {
      try {
        setLoading(true);
        const response = await API.get(`/pacientes/${id}`);

        console.log("------------c------------------");
        console.log(response.data);
        console.log("---------------x---------------");

        setPatient(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getPatient();
  }, []);

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
    </Container>
  );
}

PatientScreen.navigationOptions = {
  title: "Paciente",
};

export default PatientScreen;
