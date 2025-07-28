import { z } from "zod";

export const userFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  gender: z
    .union([z.enum(["male", "female", "other"]), z.literal("")])
    .refine((val) => val !== "", { message: "Gender is required" }),
  country: z.string().min(1, "Country is required"),
  profilePicture: z
    .any()
    .refine((file) => file instanceof FileList && file.length === 1, {
      message: "Profile picture is required",
    }),
});

export type TUserForm = z.infer<typeof userFormSchema>;
