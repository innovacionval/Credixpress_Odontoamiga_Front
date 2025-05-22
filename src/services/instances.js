import axios from "axios";

const API_URL = import.meta.env.VITE_BACK_URL || "https://neptuno.valcredit.co:3000/api/v1/";

export const axiosInstanceBearer = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const axiosInstanceFormData = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
})