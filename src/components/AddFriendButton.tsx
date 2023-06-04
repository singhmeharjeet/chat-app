"use client";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FC } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import {
	AddFriendSchema,
	AddFriendSchemaType,
} from "@/lib/validation/add-friend";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import { HorizontalDivider } from "./ui/divider";
import { type } from "os";

interface Props {}

const Page: FC<Props> = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddFriendSchemaType>({
		resolver: zodResolver(AddFriendSchema),
	});

	const [isLoading, setIsLoading] = React.useState(false);
	const addFriendValid: SubmitHandler<AddFriendSchemaType> = async (data) => {
		setIsLoading(true);
		try {
			await axios
				.post("/api/friend/add", data)
				.then(function (response: AxiosResponse) {
					console.log(response);
				});

			toast.success("Friend added successfully.");
		} catch (error: any) {
			toast.error(error.response.data);
		} finally {
			setIsLoading(false);
		}
	};
	const addFriendInvalid: SubmitErrorHandler<AddFriendSchemaType> = (
		data
	) => {};

	return (
		<>
			<Container className="w-full m-0 p-4 overflow-hidden">
				<h1 className="text-2xl font-bold text-white">Add a friend</h1>
				<form onSubmit={handleSubmit(addFriendValid, addFriendInvalid)}>
					<div className="">
						<Label
							className="font-semibold text-white"
							htmlFor="email"
						>
							Email
						</Label>
						<div className="flex justify-start items-center gap-4 w-full">
							<div className="flex justify-center items-start flex-col relative w-full py-2">
								<Input
									className={`my-[5px] text-white/90 border w-full max-w-5xl ${
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
										size="sm"
										ripple={false}
										tabIndex={-1}
										className="w-full text-red-600/95 w-fit-content hover:bg-transparent hover:text-red-500 hover:border-red-500"
									>
										<label
											htmlFor="email"
											className="bg-transparent py-2"
										>
											{errors.email.message}
										</label>
									</Button>
								)}
							</div>
						</div>
						<Button
							type="submit"
							className="w-full"
							isLoading={isLoading}
						>
							Add Friend
						</Button>
					</div>
				</form>
			</Container>
			<HorizontalDivider />
			<Container className="w-full m-0 p-4 overflow-scroll">
				<h1 className="text-2xl font-bold text-white">
					Friend Requests
				</h1>
				<Label className="text-white block py-2">Incoming</Label>
				<Label className="text-white block py-2">Outgoing</Label>
			</Container>
			<HorizontalDivider />
		</>
	);
};

export default Page;
