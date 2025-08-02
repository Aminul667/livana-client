// "use server";

import axiosInstance from "@/lib/AxiosInstance";
import { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    const errorMessage =
      (axiosError.response?.data as { message?: string })?.message ||
      axiosError.message;

    throw new Error(errorMessage);
  }
};
