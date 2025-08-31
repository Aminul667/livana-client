import { TUserProfileFormValues } from "@/schema/user.schema";

export interface ICreateUserProfileResponse {
  success: boolean;
  message: string;
  data: TUserProfileFormValues & {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export type RegisterPayload = {
  email: string;
  password: string;
  role: "tenant" | "landlord" | "admin";
};

export type RegisterResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    role: string;
    isProfileCompleted: boolean;
    createdAt: string;
  };
};
