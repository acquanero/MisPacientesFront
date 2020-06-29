import React, { useEffect } from "react";
import { ActivityIndicator, AsyncStorage, View } from "react-native";

export default ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.getItem("token2").then((token) => {
      navigation.navigate(token ? "App" : "Login");
    });
  }, []);
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};
