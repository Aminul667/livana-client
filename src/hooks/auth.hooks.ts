/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentUser, loginUser } from "@/Services/AuthServices";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
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
