import axiosInstance from "@/lib/AxiosInstance";
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