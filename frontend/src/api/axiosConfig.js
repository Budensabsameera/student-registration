import axios from "axios";

const API = axios.create({
  baseURL: "https://student-registration-backend-cl7y.onrender.com"
});

export default API;