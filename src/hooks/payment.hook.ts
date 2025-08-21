/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addPaymentHistory,
  createPaymentIntent,
} from "@/Services/PaymentServices";
import { TPayment, TPaymentResponse } from "@/types/pricing.type";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreatePaymentIntent = () => {
  return useMutation<string, Error, number>({
    mutationKey: ["create-payment-intent"],
    mutationFn: createPaymentIntent,
    retry: 1,
  });
};

export const useAddPaymentHistory = (
  options?: UseMutationOptions<TPaymentResponse, Error, TPayment>
) => {
  return useMutation<TPaymentResponse, Error, TPayment>({
    mutationKey: ["add-payment"],
    mutationFn: addPaymentHistory,
    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message = axiosError.response?.data?.message || error.message;
      toast.error(message);
    },
    ...options,
  });
};
