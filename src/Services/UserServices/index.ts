/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { AxiosError } from "axios";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/user/create-user", userData);
    revalidateTag("users");
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

export const updateUserProfile = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/user/update-profile", formData);
    console.log("✅ Response:", data);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.error("❌ Axios Error:", axiosError.toJSON?.() || axiosError);
    throw new Error(
      (axiosError.response?.data as { message?: string })?.message ||
        axiosError.message
    );
  }
};
