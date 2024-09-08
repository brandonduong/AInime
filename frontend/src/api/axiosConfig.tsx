import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://animai.onrender.com/api";
export default axios.create({
  baseURL: API_BASE_URL,
});
