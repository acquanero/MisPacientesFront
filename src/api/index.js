import axios from "axios";
import { AsyncStorage } from "react-native";

const BASE_URL = "https://damp-waters-55481.herokuapp.com/api";

const DEBUG = true; // Muestra los logs de las peticiones si esta en true

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

function getUrl(config) {
  if (config.baseURL) {
    return config.url.replace(config.baseURL, "");
  }
  return config.url;
}

// Intercept all request
API.interceptors.request.use(
  async (config) => {
    DEBUG && console.log(`${config.method.toUpperCase()} - ${getUrl(config)}:`);
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.authorization =  token;
    }
    console.log(config);
    return config;
  },
  (error) => {
    console.log("ERROR: ", error);
    return Promise.reject(error);
  }
);

// Intercept all responses
API.interceptors.response.use(
  async (response) => {
    DEBUG &&
      console.log(
        `${response.status} - ${getUrl(response.config)}:`,
        response.data
      );
    return response;
  },

  (error) => {
    DEBUG &&
      console.log(
        `${error.response.status} - ${getUrl(error.response.config)}:`,
        error.response
      );
    return Promise.reject(error);
  }
);

export default API;
