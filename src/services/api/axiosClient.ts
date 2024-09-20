import axios from "axios";
import axiosRetry from "axios-retry";
import { API_BASE_URL } from "@env";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosRetry(axiosClient, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
  retryCondition: (error) => {
    return error.code === "ECONNABORTED" || error.response?.status === 503;
  },
});

export default axiosClient;
