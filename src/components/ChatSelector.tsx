import { FC } from "react";

import React from "react";
import { Allotment } from "allotment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import SearchForFriends from "./SearchForFriends";
import Container from "./ui/container";
import AddFriendButton from "./AddFriendButton";
import { ChatBubbleLeftIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Avatar } from "./ui/avatar";
import { motion } from "framer-motion";

interface ChatSelector {
	children?: React.ReactNode;
	inputRef: React.MutableRefObject<HTMLInputElement> | undefined;
}

const ChatSelector: FC<ChatSelector> = ({ children, inputRef }) => {
	const ref = React.useRef<HTMLDivElement | null>(null);

	return (
		<Allotment.Pane
			ref={ref}
			className="h-full w-full rounded-l-xl overflow-hidden flex flex-col relative"
		>
			<Tabs defaultValue="account" className="w-full h-full ">
				<motion.div
					className="h-full w-full flex flex-col"
					initial={{ translateY: 50, display: "none" }}
					animate={{ translateY: 0, display: "flex" }}
					transition={{ duration: 0.5 }}
				>
					<Container className="p-4 pb-0 flex w-full z-50 h-auto @container">
						<TabsList className="w-full flex h-auto bg-secondary/50 p-2 flex-wrap @[15rem]:flex-nowrap overflow-hidden">
							<TabsTrigger
								value="account"
								className="w-full py-1 min-w-[5rem]"
							>
								<Avatar className="flex items-center">
									<ChatBubbleLeftIcon className="h-6 mr-2 aspect-square" />
								</Avatar>
								Chat
							</TabsTrigger>
							<TabsTrigger
								value="password"
								className="w-full py-1 min-w-[5rem]"
							>
								<Avatar className="flex items-center">
									<UserPlusIcon className="h-6 mr-2 aspect-square" />
								</Avatar>
								Manage
							</TabsTrigger>
						</TabsList>
					</Container>

					<TabsContent value="account" className="w-full h-full p-0">
						<SearchForFriends parentRef={ref} inputRef={inputRef} />
					</TabsContent>
					<TabsContent value="password" className="w-full h-full">
						<AddFriendButton />
					</TabsContent>
				</motion.div>
			</Tabs>
		</Allotment.Pane>
	);
};
export default ChatSelector;
