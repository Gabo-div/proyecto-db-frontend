import axios from "axios";
import { env } from "@/env";
import { cookies } from "next/headers";

export const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookies().get("token");

    if (token) {
      config.headers.Cookie = `token=${token.value}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
