import { z } from "zod";

export const signupSchema = z.object({
  role: z.enum(["buyer", "seller"], {
    required_error: "Please select buyer or seller",
  }),
  firstName: z.string().min(2, "First name too short"),
  lastName: z.string().min(2, "Last name too short"),
  email: z.string().email("Invalid email"),
  mobile: z.string().min(6, "Invalid phone").optional(),
  password: z.string().min(6, "Password must be 6+ characters").regex(/\S+/, "Cannot contain whitespace"),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords don't match"
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be 6+ characters")
});

export const resetSchema = z.object({
  email: z.string().email("Invalid email"),
});
