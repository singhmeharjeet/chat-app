"use client";
import { Avatar } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { FC, HTMLAttributes, use } from "react";
import ImageWithFallback from "./ui/image";
import { Check, CheckCheck, Clock } from "lucide-react";

interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
	name?: string;
	avatar: React.ReactNode;
	isSender: boolean;
	message: string;
	time: string;
	isSent: boolean;
	isRead: boolean;
	isDelivered: boolean;
}

const ChatBubble: FC<ChatBubbleProps> = ({
	name,
	message,
	isSender,
	time,
	avatar,
	isSent,
	isRead,
	isDelivered,
}) => {
	const bubbleClasses = isSender
		? "bg-primary text-white "
		: "bg-gray-200 text-gray-700";

	const { data: session } = useSession();
	return (
		<div
			className={`flex m-4 items-center @container ${
				isSender ? "justify-end" : "justify-start"
			}`}
		>
			<div className="hidden @xl:block">
				{!isSender
					? avatar
					: session?.user.image && (
							<ImageWithFallback
								fill
								src={session?.user?.image}
								alt="userImage"
							/>
					  )}
			</div>
			<div className="relative ml-2 max-w-full @sm:m-2 @xl:m-1 @xl:max-w-[80%]">
				{!isSender && (
					<p className="text-sm text-gray-400 absolute bottom-full @xl:pt-2 ">
						{name}
					</p>
				)}
				<p
					className={`py-2 px-4 rounded-[1rem] w-full h-auto overflow-hidden break-words ${bubbleClasses}`}
				>
					{message}
				</p>
				{/* Chat Bubble Tail */}
				<svg
					className={`w-4 h-4 scale-125 absolute bottom-0 ${
						isSender ? "-right-1 -scale-x-100" : "-left-1"
					}`}
					viewBox="32.484 17.5 15.515 17.5"
				>
					<path
						d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
						className={isSender ? "fill-primary" : "fill-gray-200"}
					/>
				</svg>
			</div>
			{/* Chat Message Read Recipts */}
			{/* {isSender && (
				<div className="ml-2 flex items- abosolute bottom-0">
					{delivered ? (
						<CheckCheck className="color-blue" />
					) : delivered ? (
						<Check />
					) : (
						<Clock />
					)}
				</div>
			)} */}
		</div>
	);
};
export default ChatBubble;
