"use client";
import React from "react";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";

const LoginSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Must enter an email" })
		.email({ message: "Must be of the type --> abc@abc.ab" }),
	password: z.string().min(8, { message: "Must be atleast 8 characters" }),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
	});

	const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
		signIn("credentials", {
			email: data.email,
			password: data.password,
			callbackUrl: "/",
		});
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full h-fit flex flex-col gap-4"
			>
				<div className="flex flex-col gap-2 w-full">
					<Label htmlFor="email">Email</Label>
					<Input
						{...register("email", { required: true })}
						type="email"
						id="email"
						autoComplete="email"
						placeholder="Enter your email address"
						className={cn(
							"text-black/80 border-2 ",
							errors.password && "border-red-500"
						)}
					/>
					{errors?.email && (
						<Button
							type="button"
							variant="destructive"
							size="sm"
							tabIndex={-1}
							className="bg-red-600/95 w-fit p-0"
						>
							<label
								htmlFor="email"
								className="bg-transparent px-4 py-2"
							>
								{errors.email.message}
							</label>
						</Button>
					)}
				</div>
				<div className="flex flex-col gap-2 w-full">
					<Label htmlFor="password">Password</Label>
					<Input
						{...register("password", { required: true })}
						type="password"
						id="password"
						autoComplete="current-password"
						placeholder="Password"
						className={cn(
							"my-[5px] text-black/80 border-2",
							errors.password && "border-red-500"
						)}
					/>
					{errors?.password && (
						<Button
							type="button"
							variant="destructive"
							size="sm"
							tabIndex={-1}
							className="bg-red-600/95 w-fit p-0"
						>
							<label
								htmlFor="password"
								className="bg-transparent px-4 py-2"
							>
								{errors.password.message}
							</label>
						</Button>
					)}
				</div>
				<Button type="submit" variant="secondary" className="w-full">
					Sign in
				</Button>
			</form>
		</>
	);
};

export default LoginForm;
