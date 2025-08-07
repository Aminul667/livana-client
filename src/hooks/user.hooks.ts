import { TUserProfileFormValues } from "@/schema/user.schema";
import { registerUser, updateUserProfile } from "@/Services/UserServices";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface CreateUserProfileResponse {
  success: boolean;
  message: string;
  data: TUserProfileFormValues & {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
}

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

export const useUpdateUserProfile = () => {
  return useMutation<CreateUserProfileResponse, Error, FormData>({
    mutationKey: ["update-user-profile"],
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      toast.success(data.message || "User profile updated successfully!");
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message = axiosError.response?.data?.message || error.message;
      toast.error(message);
    },
  });
};
