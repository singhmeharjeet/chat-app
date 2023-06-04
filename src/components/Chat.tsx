"use client";

import axios from "axios";
import { FC, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import { Allotment } from "allotment";
import ChatMessages from "./ChatMessages";
import { bounce, cn } from "@/lib/utils";
import { motion } from "framer-motion";
import ProfileButton from "./ProfileButton";
import { inputVariants } from "./ui/input";
import { Send } from "lucide-react";

interface Chat {
	children?: React.ReactNode;
}
const Chat: FC<Chat> = () => {
	return (
		<Allotment.Pane className="h-full w-full">
			<motion.div
				className="h-full w-full flex flex-col justify-end rounded-r-xl border-l border-l-gray-200"
				initial={{ translateY: -50, display: "none" }}
				animate={{ translateY: 0, display: "flex" }}
				transition={{ duration: 0.5 }}
			>
				<ChatMessages />
				<ChatInput
					chatPartner={{
						id: "asfasf",
						name: "asdfaf",
						image: "asdasfd",
						email: "dsafafasdfdf",
					}}
					chatId="asdfasf"
				/>
			</motion.div>
		</Allotment.Pane>
	);
};

export default Chat;

interface ChatInputProps {
	chatPartner: User;
	chatId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [input, setInput] = useState<string>("");

	const sendMessage = async () => {
		if (!input) return;
		setIsLoading(true);

		try {
			await axios.post("/api/message/send", { text: input, chatId });
			setInput("");
			textareaRef.current?.focus();
		} catch {
			toast.error("Something went wrong. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className="border-t z-10 border-gray-300 px-4 p-4 flex justify-between items-center w-full gap-2">
				<ProfileButton />

				<TextareaAutosize
					ref={textareaRef}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							bounce(textareaRef);
							sendMessage();
						}
					}}
					maxRows={8}
					rows={2}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder={`Message ${chatPartner.name}`}
					className={cn(
						inputVariants({}),
						"w-full h-full resize-none px-4 py-4 m-0"
					)}
				/>

				<Button
					size="lg"
					variant="ghost"
					isLoading={isLoading}
					onClick={sendMessage}
					type="submit"
					className="hover:bg-transparent hover:ring-1 hover:ring-blue-600 px-8 my-2 h-full max-h-16 text-white group"
				>
					Send
					<Send className="h-8 w-10 ml-1 text-white group-hover:text-primary" />
				</Button>
			</div>
		</>
	);
};
