import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";
import { Header } from "react-navigation-stack";
import API from "../api";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    errors: [],
  });

  const { navigation } = props;
  const { errors } = state;
  const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

  const handleRegister = async () => {
    setLoading(true);
    const { name, email, password } = state;

    try {
      const response = await API.post("/auth/register", {
        name,
        email,
        password,
      });
      console.log("RESPONSE: ", response);
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
          <Input
            label="Nombre y Apellido"
            error={hasErrors("name")}
            style={[styles.input, hasErrors("name")]}
            defaultValue={state.name}
            onChangeText={(text) => setState({ ...state, name: text })}
          />

          <Input
            label="Email"
            error={hasErrors("email")}
            style={[styles.input, hasErrors("email")]}
            defaultValue={state.email}
            onChangeText={(text) => setState({ ...state, email: text })}
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