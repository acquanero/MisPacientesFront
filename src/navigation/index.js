import React from "react";
import { Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import TabBarIcon from "../components/TabBarIcon";
import { theme } from "../constants";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import CalendarScreen from "../screens/CalendarScreen";
import LoginScreen from "../screens/LoginScreen";
import PatientsListScreen from "../screens/PatientsListScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ShiftsListScreen from "../screens/ShiftsListScreen";
import PatientScreen from "../screens/PatientScreen";
import ShiftScreen from "../screens/ShiftScreen";

// Sección de home en el tab bar
const ShiftsNavigator = createStackNavigator(
  {
    ShiftsList: {
      screen: ShiftsListScreen,
    },
    Shift: {
      screen: ShiftScreen,
    },
  },
  {
    navigationOptions: {
      title: "Turnos",
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name="md-list" />
      ),
    },
  }
);
// Sección de pacientes en el tab bar
const PatientsNavigator = createStackNavigator(
  {
    Patients: {
      screen: PatientsListScreen,
    },
    Patient: {
      screen: PatientScreen,
    },
  },
  {
    navigationOptions: {
      title: "Pacientes",
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name="md-contact" />
      ),
    },
  }
);
// Sección de calendario en el tab bar
const CalendarNavigator = createStackNavigator(
  {
    Calendar: {
      screen: CalendarScreen,
    },
  },
  {
    navigationOptions: {
      title: "Calendario",
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name="md-calendar" />
      ),
    },
  }
);
// Tab bar en si
const AppNavigator = createBottomTabNavigator(
  {
    Home: ShiftsNavigator,
    Patients: PatientsNavigator,
    Calendar: CalendarNavigator,
  },
  {
    initialRouteName: "Patients",
  }
);
// Sección de autenticación
const AuthNavigator = createStackNavigator(
  {
    AuthLoading: {
      screen: AuthLoadingScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
  },
  {
    initialRouteName: "AuthLoading",
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0, // for android
      },
      headerBackImage: (
        <Image source={require("../../assets/icons/back.png")} />
      ),
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base,
        paddingRight: theme.sizes.base,
      },
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: theme.sizes.base,
      },
    },
  }
);

// Sección base
const BaseStack = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    App: AppNavigator,
  },
  {
    initialRouteName: "Auth",
  }
);

export default createAppContainer(BaseStack);
