"use client";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import ChatBubble from "./ChatBubble";
import { FC } from "react";

interface Props {}
const ChatMessages: FC<Props> = (props) => {
	return (
		<ScrollArea className="flex scroll-smooth">
			{Array.from({ length: 20 }).map((_, i) => (
				<ChatBubble
					key={i}
					isSender={i % 2 === 0 ? true : false}
					avatar={
						<Image
							loader={({ src }) => {
								if (i % 2 === 0) return src + "g=male";
								else return src + "g=female";
							}}
							src="https://xsgames.co/randomusers/avatar.php?"
							alt="Profile picture"
							className="rounded-full w-8 h-8"
							width={32}
							height={32}
						/>
					}
					name="Mehar"
					message={i.toString()}
					time={Date.now().toString()}
					isSent={i % 2 === 0 ? true : false}
					isRead={i % 2 === 0 ? true : false}
					isDelivered={i % 2 === 0 ? true : false}
				/>
			))}
		</ScrollArea>
	);
};

export default ChatMessages;
