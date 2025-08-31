/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerUser } from "@/Services/UserServices";
import { RegisterPayload, RegisterResponse } from "@/types/auth.type";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useRegisterUser = (
  options?: UseMutationOptions<RegisterResponse, Error, RegisterPayload>
) => {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationKey: ["register-user"],
    mutationFn: registerUser,
    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message = axiosError.response?.data?.message || error.message;
      toast.error(message);
    },
    ...options,
  });
};
