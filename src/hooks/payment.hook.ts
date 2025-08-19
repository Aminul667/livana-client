import { createPaymentIntent } from "@/Services/PaymentServices";
import { useMutation } from "@tanstack/react-query";

export const useCreatePaymentIntent = () => {
  return useMutation<string, Error, number>({
    mutationKey: ["CREATE_PAYMENT_INTENT"],
    mutationFn: createPaymentIntent,
    retry: 1,
  });
};
