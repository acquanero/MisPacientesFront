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
} from "native-base";
import {StyleSheet} from "react-native";
import React, { useEffect, useState } from "react";
import API from "../api";
import { LoadingSpinner, GenericList } from "../components";
import { formatDate } from "../utils/dates";

function EvolutionScreen({ navigation }) {
    const id = navigation.getParam("id", null);
    const [active, setActive] = useState(false);
    const [evolution, setEvolution] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getEvolution() {
            try {
                setLoading(true);
                const response = await API.get(`/evoluciones/${id}`);

                setEvolution(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        getEvolution();
    }, []);

    const renderEvolutionInfo = () => {
        if (!evolution) {
            if (loading) {
                return <LoadingSpinner show={loading} />;
            }
            return <Text>No hay resultados</Text>;
        }
        const {
            fecha,
            motivoConsulta,
            descripcion,
        } = evolution;

        const fechaFormateada = formatDate(fecha);

        return (
            <React.Fragment>
                <Card>
                    <CardItem header bordered>
                        <Text style={styles.header}>Evolucion - {fechaFormateada}</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Body>
                            <Text style={styles.title}>Motivo de Consulta:</Text>
                            <Text>{motivoConsulta}</Text>
                            <Text> </Text>
                            <Text style={styles.title}>Descripcion:</Text>
                            <Text>{descripcion}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </React.Fragment>
        );
    };

    return (
        <Container>
            <Content>{renderEvolutionInfo()}</Content>
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
                <Button style={{ backgroundColor: "#34A34F" }}>
                    <Icon type="FontAwesome" name="pencil" />
                </Button>
                <Button style={{ backgroundColor: "#DD5144" }}>
                    <Icon type="Feather" name="trash" />
                </Button>
            </Fab>
        </Container>
    );
}

EvolutionScreen.navigationOptions = {
    title: "Evolucion",
};

const styles = StyleSheet.create({
    header:{
        fontSize: 24,
    },
    title: {
      fontSize: 18,
      textDecorationLine: 'underline'
    },
  });

export default EvolutionScreen;