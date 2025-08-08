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
