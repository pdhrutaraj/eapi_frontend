import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://eapi-vijn.onrender.com/api/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

