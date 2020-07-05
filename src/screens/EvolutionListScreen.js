import { Content, Fab, Icon, List, ListItem, Text } from "native-base";
import React, { useEffect, useState } from "react";
import API from "../api";
import { LoadingSpinner, ToolbarActions } from "../components";
import { formatDate } from "../utils/dates";

function EvolutionListScreen({ navigation }) {
  const id = navigation.getParam("id", null);
  const refresh = navigation.getParam("refresh", false);
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getEvolutions() {
      try {
        setLoading(true);
        const response = await API.get(`/evoluciones/paciente/${id}`);
        setEvolutions(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getEvolutions();
  }, [refresh]);

  const openEvolution = (id) => {
    navigation.navigate("Evolution", { id });
  };

  const goToCreate = () => {
    navigation.navigate("CreateEvolution", {
      id,
    });
  };

  const renderEvolutionList = () => {
    if (!evolutions || evolutions.length === 0) {
      if (loading) {
        return <LoadingSpinner show={loading} />;
      }
      return <Text>No hay resultados</Text>;
    }

    return (
      <List>
        {evolutions.map(({ _id, fecha, motivoConsulta }) => {
          return (
            <ListItem
              key={_id}
              button
              onPress={() => {
                openEvolution(_id);
              }}
            >
              <Text>
                {formatDate({ fecha })} - {motivoConsulta}
              </Text>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <React.Fragment>
      <Content>{renderEvolutionList()}</Content>
      <Fab
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: "#5067FF" }}
        position="bottomRight"
        onPress={() => {
          goToCreate();
        }}
      >
        <Icon name="add" />
      </Fab>
    </React.Fragment>
  );
}

EvolutionListScreen.navigationOptions = {
  title: "Evoluciones",
  headerRight: () => <ToolbarActions />,
};

export default EvolutionListScreen;
