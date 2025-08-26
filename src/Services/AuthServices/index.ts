/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    const errorMessage =
      (axiosError.response?.data as { message?: string })?.message ||
      axiosError.message;

    throw new Error(errorMessage);
  }
};

// export const logout = async () => {
//   await axiosInstance.post("/auth/logout");
// };

export const getCurrentUser = async () => {
  try {
    const { data } = await axiosInstance.get("/user/me");
    return data.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    const errorMessage =
      (axiosError.response?.data as { message?: string })?.message ||
      axiosError.message;

    throw new Error(errorMessage);
  }
};

export const updateUserProfile = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/user/update-profile", formData);

    if (data.success) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
    }

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

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};
