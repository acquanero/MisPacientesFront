import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import TabBarIcon from "../components/TabBarIcon";
import { theme } from "../constants";
import CalendarScreen from "../screens/CalendarScreen";
import LoginScreen from "../screens/LoginScreen";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import PatientScreen from "../screens/PatientScreen";
import PatientsListScreen from "../screens/PatientsListScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ShiftScreen from "../screens/ShiftScreen";
import ShiftsListScreen from "../screens/ShiftsListScreen";
import EvolutionListScreen from "../screens/EvolutionListScreen";
import EvolutionScreen from "../screens/EvolutionScreen";
import CreateEvolutionScreen from "../screens/CreateEvolutionScreen";
import ModifyEvolutionScreen from '../screens/ModifyEvolutionScreen';
import CreateAppointmentScreen from "../screens/CreateAppointmentScreen";
import EditPatientScreen from "../screens/EditPatientScreen";

// Sección turnos en el tab bar
const ShiftsNavigator = createStackNavigator(
  {
    ShiftsList: {
      screen: ShiftsListScreen,
    },
    Shift: {
      screen: ShiftScreen,
    },
    CreateAppointment: {
      screen: CreateAppointmentScreen,
    }
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
    PatientsList: {
      screen: PatientsListScreen,
    },
    Patient: {
      screen: PatientScreen,
    },
    EditPatient: {
      screen: EditPatientScreen,
    },
    EvolutionList:{
      screen: EvolutionListScreen,
    },
    Evolution:{
      screen: EvolutionScreen,
    },
    CreateEvolution:{
      screen: CreateEvolutionScreen,
    },
    ModifyEvolution:{
      screen: ModifyEvolutionScreen,
    }
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
const AppTabsNavigator = createBottomTabNavigator(
  {
    Shifts: ShiftsNavigator,
    Patients: PatientsNavigator,
    Calendar: CalendarNavigator,
  },
  {
    initialRouteName: "Shifts",
  }
);

// Sección de chequeo de token
const OnBoardingNavigator = createStackNavigator({
  OnBoarding: {
    screen: OnBoardingScreen,
  },
});

// Sección de autenticación
const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.colors.white,
        borderBottomColor: "transparent",
        elevation: 0, // ocultar la linea del header
      },
    },
  }
);

// Sección base
const BaseStack = createSwitchNavigator(
  {
    OnBoarding: OnBoardingNavigator,
    Auth: AuthNavigator,
    App: AppTabsNavigator,
  },
  {
    initialRouteName: "OnBoarding",
  }
);

export default createAppContainer(BaseStack);
