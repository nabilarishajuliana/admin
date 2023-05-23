import axios from "axios";

const api = axios.create({
  baseURL: "https://api-tefa-berita.vercel.app/",
  // baseURL: "http://localhost:4000",
});

const setAuthToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Call setAuthToken initially to set the headers
setAuthToken();

// Add a request interceptor to update headers before each request
api.interceptors.request.use(
  (config) => {
    setAuthToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;


