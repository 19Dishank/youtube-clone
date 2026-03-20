import axios from "axios";

export const AxiosInstanceForYoutube = axios.create({
  baseURL: "https://api.freeapi.app/api/v1/public/youtube",
});

AxiosInstanceForYoutube.interceptors.request.use(
  (config) => {
    console.log("Requested on ", config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

AxiosInstanceForYoutube.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);
