/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { RegisterPayload, RegisterResponse } from "@/types/auth.type";
import { AxiosError } from "axios";

export const registerUser = async (
  userData: RegisterPayload
): Promise<RegisterResponse> => {
  try {
    const { data } = await axiosInstance.post("/user/create-user", userData);

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    let errorMessage = axiosError.message;
    if (
      axiosError.response?.data &&
      typeof axiosError.response.data === "object" &&
      "message" in axiosError.response.data
    ) {
      errorMessage = (axiosError.response.data as any).message;
    }

    throw new Error(errorMessage);
  }
};

export const getUserById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/user/${id}`);

    return data.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.error("❌ Axios Error:", axiosError.toJSON?.() || axiosError);
    throw new Error(
      (axiosError.response?.data as { message?: string })?.message ||
        axiosError.message
    );
  }
};
