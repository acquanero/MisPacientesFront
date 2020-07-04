import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  AsyncStorage,
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";
import API from "../api";

const VALID_EMAIL = "test@test.com";
const VALID_PASSWORD = "1234";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    errors: [],
  });

  const { navigation } = props;
  const { errors } = state;
  const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

  const handleLogin = async () => {
    navigation.navigate("Patients");
    return;

    setLoading(true);
    const { email, password } = state;

    try {
      // Intentamos pegarle al endpoint de login
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      try {
        AsyncStorage.setItem("token2", response.data.token); // se guarda en el asyncStorage que es la memoria de la app
        navigation.navigate("Patients"); // se va a la pantalla de pacientes
      } catch (e) {
        console.log("ERROR_ ", e);
        // si ocurre un error al parsear es porque no devolvio el token, si no, un mensaje de error
        // throw response.data; // lanzamos la excepción para que la agarre el catch con el mensaje que viene del back (Usuario o contraseña invalido)
      }
    } catch (error) {
      console.log("Error: ", error.message);
      // Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.login} behavior="height">
      <Block padding={[0, theme.sizes.base * 2]}>
        <Text style={styles.tituloInicio}>
          Iniciar Sesión
        </Text>
        <Block middle>
          <Input
            placeholder="Email"
            error={hasErrors("email")}
            style={[styles.input, hasErrors("email")]}
            defaultValue={state.email}
            onChangeText={(text) => setState({ ...state, email: text })}
          />
          <Input
            secure
            placeholder="Contraseña"
            error={hasErrors("password")}
            style={[styles.input, hasErrors("password")]}
            defaultValue={state.password}
            onChangeText={(text) => setState({ ...state, password: text })}
          />

        </Block>
        <Button gradient onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Iniciar Sesión
              </Text>
            )}
          </Button>

          <Button onPress={() => navigation.navigate("Register")}>
            <Text
              gray
              caption
              center
              style={{ textDecorationLine: "underline" }}
            >
              No tenes cuenta? Registrate
            </Text>
          </Button>
      </Block>
    </KeyboardAvoidingView>
  );
};

Login.navigationOptions={
  title: 'Mis Pacientes',
  headerStyle:{
    backgroundColor: 'rgb(138,234,228)'
  },
  headerTitleStyle:{
    fontWeight: '700',
    fontSize: 30
  }
}

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
  tituloInicio:{
    paddingTop: 25,
    fontSize: 25
  }
});

export default Login;
