/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  getCurrentUser,
  loginUser,
  updateUserProfile,
} from "@/Services/AuthServices";
import { ICreateUserProfileResponse } from "@/types/auth.type";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUserLogin = (
  options?: UseMutationOptions<any, Error, FieldValues>
) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: loginUser,
    onError: (error) => {
      toast.error(error.message);
    },
    ...options, // ✅ spread user-defined callbacks like onSuccess
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const useUpdateUserProfile = (
  options?: UseMutationOptions<any, Error, FieldValues>
) => {
  return useMutation<ICreateUserProfileResponse, Error, FormData>({
    mutationKey: ["update-user-profile"],
    mutationFn: updateUserProfile,
    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message = axiosError.response?.data?.message || error.message;
      toast.error(message);
    },
    ...options,
  });
};
