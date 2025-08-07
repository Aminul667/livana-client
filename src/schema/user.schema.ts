import { isValidPhoneNumber } from "react-phone-number-input";
import z from "zod";

export const userProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().refine((val) => isValidPhoneNumber(val), {
    message: "Enter a valid phone number",
  }),
  location: z.string().min(1, "Location is required"),
  profilePhoto: z.string().optional(),
  about: z.string().min(1, "Please write something about you"),
});

export type TUserProfileFormValues = z.infer<typeof userProfileSchema>;
