import z from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().max(20, { message: "Name cannot exceed 20 characters!" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must have at least 6 characters!" }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Password must match!",
      path: ["confirmPassword"],
    }
  );

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
