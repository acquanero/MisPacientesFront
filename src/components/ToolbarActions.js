import { Button, Icon } from "native-base";
import React from "react";
import { Alert, AsyncStorage } from "react-native";
import { withNavigation } from "react-navigation";

const ToolbarActions = ({ navigation }) => {
  const logout = () => {
    AsyncStorage.removeItem("token").then(() => {
      navigation.navigate("Login");
    });
  };

  const confirmExit = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estas seguro que deseas salir?",
      [
        {
          text: "No",
          style: "cancel",
        },
        { text: "Si", onPress: logout },
      ],
      { cancelable: false }
    );
  };

  return (
    <Button transparent onPress={confirmExit}>
      <Icon name="exit" />
    </Button>
  );
};

export default withNavigation(ToolbarActions);
