"use client";
import Container from "@/components/ui/container";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import Chat from "@/components/Chat";
import ChatSelector from "@/components/ChatSelector";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useKey } from "@/Hooks/useKey";

const page = () => {
	const session = useSession();
	if (!session || session.status !== "authenticated") {
		redirect("/");
	}
	const inputRef = React.useRef<HTMLInputElement>(null);
	useKey("/", inputRef); // meta.key + /

	return (
		<Container className="bg-gradient-dark-inverse h-screen flex flex-col py-0">
			<Container className="grow h-auto w-full p-0 my-8 overflow-hidden bg-slate-700/30 border-2 border-slate-200 rounded-2xl ">
				<Allotment defaultSizes={[150, 400]} className="h-full">
					<ChatSelector
						inputRef={
							inputRef as React.MutableRefObject<HTMLInputElement>
						}
					/>
					<Chat />
				</Allotment>
			</Container>
		</Container>
	);
};

export default page;
