import axios from "axios";

const API = axios.create({
  baseURL: "https://student-registration-6ba1.onrender.com"
});

export default API;