import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import API from "../api";
import { Block, Button, Input, Text } from "../components";
import { theme } from "../constants";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    mail: "",
    password: "",
    errors: [],
  });

  const { navigation } = props;
  const { errors } = state;
  const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

  const handleRegister = async () => {
    setLoading(true);
    const { mail, password } = state;

    try {
      const response = await API.post("/medicos/register", {
        mail,
        password,
      });
      return Alert.alert("Exito", "Usuario Creado", [
        {
          text: "Ir al inicio",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.login} behavior="height">
      <Block padding={[0, theme.sizes.base * 2]}>
        <Text h1 bold>
          Registrate
        </Text>

        <Block middle>
          {/* <Input
            label="Nombre y Apellido"
            error={hasErrors("name")}
            style={[styles.input, hasErrors("name")]}
            defaultValue={state.name}
            onChangeText={(text) => setState({ ...state, name: text })}
          /> */}

          <Input
            label="Email"
            error={hasErrors("email")}
            style={[styles.input, hasErrors("email")]}
            defaultValue={state.email}
            onChangeText={(text) => setState({ ...state, mail: text })}
          />
          <Input
            secure
            label="Contraseña"
            error={hasErrors("password")}
            style={[styles.input, hasErrors("password")]}
            defaultValue={state.password}
            onChangeText={(text) => setState({ ...state, password: text })}
          />

          <Button gradient onPress={handleRegister}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Registrate
              </Text>
            )}
          </Button>

          <Button onPress={() => navigation.navigate("Login")}>
            <Text
              gray
              caption
              center
              style={{ textDecorationLine: "underline" }}
            >
              Ya tenes cuenta? Inicia Sesión
            </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});

export default Login;
