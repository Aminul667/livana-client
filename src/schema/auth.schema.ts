import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().refine((val) => val.includes("@"), {
    message: "Invalid email address",
  }),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type TSignInFormValues = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  email: z.string().refine((val) => val.includes("@"), {
    message: "Invalid email address",
  }),

  password: z.string().min(6, "Password must be at least 6 characters"),

  role: z.enum(["landlord", "tenant"]),

  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and privacy policy",
  }),
});

export type TSignUpFormValues = z.infer<typeof signUpSchema>;
