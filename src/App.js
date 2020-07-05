import { Ionicons } from "@expo/vector-icons";
import { registerRootComponent, SplashScreen } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Container, Root } from "native-base";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Navigation from "./navigation";

const images = [require("../assets/icons/back.png")];

function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        });

        const cacheImages = images.map((image) => {
          return Asset.fromModule(image).downloadAsync();
        });

        await Promise.all(cacheImages);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Root>
        <SafeAreaView style={styles.container}>
          <Container>
            <Navigation />
          </Container>
        </SafeAreaView>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default registerRootComponent(App);
