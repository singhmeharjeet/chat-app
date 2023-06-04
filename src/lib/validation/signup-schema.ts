import { z } from "zod";

export const signupValidationSchema = z
	.object({
		firstName: z
			.string()
			.trim()
			.min(1, { message: "Firstname is required" }),
		lastName: z.string().trim().min(1, { message: "Lastname is required" }),
		email: z
			.string()
			.trim()
			.min(1, { message: "Email is required" })
			.email({
				message: "Must be of type-->  abcd@abcd.abc",
			}),
		password: z
			.string()
			.trim()
			.min(6, { message: "Password must be atleast 6 characters" }),
		confirmPassword: z
			.string()
			.trim()
			.min(1, { message: "Confirm Password is required" }),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{
			path: ["confirmPassword"],
			message: "Passwords don't match",
		}
	);

export type signupValidationSchemaType = z.infer<typeof signupValidationSchema>;
