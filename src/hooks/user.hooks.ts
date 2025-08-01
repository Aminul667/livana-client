/* eslint-disable @typescript-eslint/no-explicit-any */

import { registerUser } from "@/Services/UserServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: ["user", "register"],
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
