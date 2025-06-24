import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define your Zod schema

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const signinSchema = z.object({
    email: z.string()
      .email("Invalid email address"),
    password: z.string()
      .min(6, "Password must be at least 6 characters long")
      .max(30, "Password must not be longer than 30 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      )
});




type FormData = z.infer<typeof signupSchema>;

export { signupSchema,signinSchema,zodResolver};
export type { FormData };
