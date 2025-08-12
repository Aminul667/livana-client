import axios from "axios";
import envConfig from "@/config/envConfig";

// ✅ Determine if we're on the server or client
const isServer = typeof window === "undefined";

// ✅ Create the axios instance
const axiosInstance = axios.create({
  baseURL: envConfig.baseApi, 
  withCredentials: true, // for client-side requests
  headers: {
    Accept: "application/json",
  },
});

// ✅ Intercept request to attach cookies manually on server
axiosInstance.interceptors.request.use(
  async (config) => {
    if (isServer) {
      // Only import next/headers dynamically to avoid client-side issues
      const { cookies } = await import("next/headers");

      const cookieStore = await cookies();
      const token = cookieStore.get("accessToken")?.value;

      if (token) {
        // ✅ Use set() to safely add header to AxiosHeaders instance
        config.headers?.set?.("Cookie", `accessToken=${token}`);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Simple response passthrough
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
