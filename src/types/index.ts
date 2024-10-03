import { z } from "zod";

export type Paper = {
  id: string;
  length: string;
  width: string;
  thickness: string;
  rate: string;
  [key: string]: string;
};

export type CostHistoryType = {
  id: string;
  name: string;
  papers: Paper[];
  final_price: number;
  created_at?: string;
};

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .max(15, { message: "Password maximum length is 15" }),
});

export type LoginFields = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" })
      .max(15, { message: "Password maximum length is 15" })
      .regex(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Password must contain mix of digits, letters and any special characters"
      ),
    confirm_password: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Confirm password do not match",
    path: ["confirm_password"],
  });

export type SignupFields = z.infer<typeof signupSchema>;
