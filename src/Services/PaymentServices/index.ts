"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { TPayment } from "@/types/pricing.type";
import { AxiosError } from "axios";

export const createPaymentIntent = async (amount: number) => {
  console.log({ amount });
  try {
    const { data } = await axiosInstance.post(
      "/payments/stripe-payment-intent",
      {
        amount,
      }
    );
    console.log("payment intent secret", data.data.client_secret);
    return data.data.client_secret;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.error("❌ Axios Error:", axiosError.toJSON?.() || axiosError);
    throw new Error(
      (axiosError.response?.data as { message?: string })?.message ||
        axiosError.message
    );
  }
};

export const addPaymentHistory = async (payload: TPayment) => {
  try {
    const { data } = await axiosInstance.post("/payments/add", payload);

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
