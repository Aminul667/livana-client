/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { AxiosError } from "axios";

export const addListing = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/listing/add", formData);
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

export const getAllListing = async (queryParams: Record<string, string>) => {
  console.log("queryParams", queryParams);
  try {
    const { data } = await axiosInstance.get("/listing", {
      params: queryParams,
    });

    // return data.data;
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
