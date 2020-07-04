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
import { cos } from "react-native-reanimated";

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [medicoId, setMedicoId] = useState("dddd");

  async function handleLogin() {
    try {
      setLoading(true);
      const response = await API.get(`medicos/checkexistence/${mail}-${password}`);
      {setMedicoId(response.data)}
      console.log("------------c------------------");
      console.log({medicoId});
      console.log("---------------x---------------");

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.login} behavior="height">
      <Block padding={[0, theme.sizes.base * 2]}>
        <Text style={styles.tituloInicio}>
          Iniciar Sesión
        </Text>
        <Block middle>
          <Input
            placeholder="Email"
            style={[styles.input]}
            onChangeText={(text) => {
              setMail(text)
            }}
          />
          <Input
            secure
            placeholder="Contraseña"
            style={[styles.input]}
            onChangeText={(text) => {
              setPassword(text)
            }}
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
