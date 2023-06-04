"use client";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
import {
	signupValidationSchemaType,
	signupValidationSchema,
} from "@/lib/validation/signup-schema";
import { toast } from "react-hot-toast";

const SignupForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<signupValidationSchemaType>({
		resolver: zodResolver(signupValidationSchema),
	});

	const onValid: SubmitHandler<signupValidationSchemaType> = (data) => {
		console.table(data);
	};

	const onInValid: SubmitErrorHandler<signupValidationSchemaType> = (
		data
	) => {
		console.error("Failed");
		console.table(data);
		toast.error("Invalid Form Data");
	};

	return (
		<form onSubmit={handleSubmit(onValid, onInValid)}>
			<div className="md:flex md:justify-between gap-2">
				<div className="grow my-2 max-md:w-full max-2xl:w-[50%]">
					<Label
						className="font-semibold text-white/70"
						htmlFor="firstName"
					>
						First Name
					</Label>
					<Input
						className={cn(
							"my-[5px] text-white/90",
							errors.firstName && "border-red-500 border"
						)}
						id="firstName"
						type="text"
						placeholder="First Name"
						{...register("firstName")}
					/>
					{errors?.firstName && (
						<Button
							type="button"
							variant="link"
							ripple={false}
							size="sm"
							tabIndex={-1}
							className=" text-red-500 w-fit p-0 hover:no-underline"
						>
							<label
								htmlFor="firstName"
								className="bg-transparent p-0 cursor-pointer hover:underline"
							>
								{errors.firstName.message}
							</label>
						</Button>
					)}
				</div>
				<div className="grow my-2 max-md:w-full max-2xl:w-[50%]">
					<Label
						className="font-semibold text-white/70"
						htmlFor="lastName"
					>
						Last Name
					</Label>
					<Input
						className={`my-[5px] text-white/90 border ${
							errors.lastName && "border-red-500"
						}`}
						id="lastName"
						type="text"
						placeholder="Last Name"
						{...register("lastName")}
					/>
					{errors?.lastName && (
						<Button
							type="button"
							variant="link"
							ripple={false}
							size="sm"
							tabIndex={-1}
							className=" text-red-500 w-fit p-0 hover:no-underline"
						>
							<label
								htmlFor="lastName"
								className="bg-transparent p-0 cursor-pointer hover:underline"
							>
								{errors.lastName.message}
							</label>
						</Button>
					)}
				</div>
			</div>
			<div className="grow my-2">
				<Label className="font-semibold text-white/70" htmlFor="email">
					Email
				</Label>
				<Input
					className={`my-[5px] text-white/90 border ${
						errors.email && "border-red-500"
					}`}
					id="email"
					type="email"
					placeholder="Email"
					autoComplete="username"
					{...register("email")}
				/>
				{errors?.email && (
					<Button
						type="button"
						variant="link"
						ripple={false}
						size="sm"
						tabIndex={-1}
						className=" text-red-500 w-fit p-0 hover:no-underline"
					>
						<label
							htmlFor="email"
							className="bg-transparent p-0 cursor-pointer hover:underline"
						>
							{errors.email.message}
						</label>
					</Button>
				)}
			</div>
			<div className="md:flex md:justify-between gap-2 max-2xl:w-full">
				<div className="grow my-2 max-md:w-full max-2xl:w-[50%]">
					<Label
						className="font-semibold text-white/70"
						htmlFor="password"
					>
						Password
					</Label>
					<Input
						className={`my-[5px] text-white/90 ${
							errors.password && "border-red-500"
						}`}
						id="password"
						placeholder="Password"
						type={showPassword ? "text" : "password"}
						autoComplete="new-password"
						{...register("password")}
					/>
					{errors?.password && (
						<Button
							type="button"
							variant="link"
							ripple={false}
							size="sm"
							tabIndex={-1}
							className=" text-red-500 w-fit p-0 hover:no-underline"
						>
							<label
								htmlFor="password"
								className="bg-transparent p-0 cursor-pointer hover:underline"
							>
								{errors.password.message}
							</label>
						</Button>
					)}
				</div>
				<div className="grow my-2 max-md:w-full max-2xl:w-[50%]">
					<Label
						className="font-semibold text-white/70"
						htmlFor="confirmPassword"
					>
						Confirm Password
					</Label>
					<Input
						className={`my-[5px] text-white/90 border ${
							errors.confirmPassword && "border-red-500"
						}`}
						type={showPassword ? "text" : "password"}
						id="confirmPassword"
						placeholder="Confirm Password"
						autoComplete="new-password"
						{...register("confirmPassword")}
					/>
					{errors?.confirmPassword && (
						<Button
							type="button"
							variant="link"
							ripple={false}
							size="sm"
							tabIndex={-1}
							className=" text-red-500 w-fit p-0 hover:no-underline"
						>
							<label
								htmlFor="confirmPassword"
								className="bg-transparent p-0 cursor-pointer hover:underline"
							>
								{errors.confirmPassword.message}
							</label>
						</Button>
					)}
				</div>
			</div>
			<div className="flex justify-start items-center gap-2 h-fit my-2">
				<Label
					className="font-semibold text-white/70"
					htmlFor="Show Password"
				>
					Show Password
				</Label>
				<Checkbox
					className="border-input"
					defaultChecked={showPassword}
					onClick={() => setShowPassword((prev) => !prev)}
				/>
			</div>

			<div className="my-8 lg:my-8 text-center">
				<Button
					className="w-full md:w-1/2"
					variant="secondary"
					type="submit"
				>
					Register Account
				</Button>
			</div>
		</form>
	);
};

export default SignupForm;
