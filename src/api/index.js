import axios from "axios";

const BASE_URL = "https://damp-waters-55481.herokuapp.com/api";

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
  (config) => {
    console.log(`${config.method.toUpperCase()} - ${getUrl(config)}:`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept all responses
API.interceptors.response.use(
  async (response) => {
    console.log(
      `${response.status} - ${getUrl(response.config)}:`,
      response.data
    );
    return response;
  },

  (error) => {
    console.log(
      `${error.response.status} - ${getUrl(error.response.config)}:`,
      error.response
    );
    return Promise.reject(error);
  }
);

export default API;
