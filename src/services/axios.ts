import axios, { type AxiosRequestHeaders } from "axios";
import { msalInstance, tokenRequest } from "../msalConfig";

// 1️⃣ Create axios instance (recommended)
export const api = axios.create({

  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ REQUEST INTERCEPTOR (Attach Token Automatically)
api.interceptors.request.use(
  async (config) => {
    if (!config) return config;

    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      try {
        const tokenResponse = await msalInstance.acquireTokenSilent({
          ...tokenRequest,
          account: accounts[0],
        });

        if (tokenResponse?.accessToken) {
          config.headers = {
            ...(config.headers as Record<string, string>),
            Authorization: `Bearer ${tokenResponse.accessToken}`,
          } as AxiosRequestHeaders;
        }
      } catch (error) {
        console.warn("MSAL token acquisition failed", error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ OPTIONAL: RESPONSE INTERCEPTOR (Handle 401 globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired / invalid
      localStorage.removeItem("token");

      // Optional: redirect to login
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

// 2️⃣ Get tasks
export const getTasks = async () => {
  const res = await api.get("tasks");
  console.log(res.data);
};
