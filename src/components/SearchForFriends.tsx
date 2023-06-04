import { ScrollArea } from "./ui/scroll-area";
import React, { FC, HTMLAttributes, useState } from "react";
import Container from "./ui/container";
import ImageWithFallback from "./ui/image";
import { Input } from "./ui/input";
import Link from "next/link";
import { bounce, cn } from "@/lib/utils";
import { Avatar } from "./ui/avatar";
import { useFuse } from "@/Hooks/useFuse";
import ShortcutKeys from "./ui/shortcutkeys";

const People = [
	{
		id: 1253,
		name: "Taylor Otwell",
		role: "Member",
	},
	{
		id: 1,
		name: "Adam Wathan",
		role: "Member",
	},
	{
		id: 12,
		name: "Duke Street Studio Inc.",
		role: "Developer",
	},
	{
		id: 113,
		name: "Taylor Ot ",
		role: "Member",
	},
	{
		id: 123,
		name: "Adam Wathan",
		role: "Member",
	},
	{
		id: 133,
		name: "Duke Street Studio Inc.",
		role: "Developer",
	},
	{
		id: 143,
		name: "Taylor Otwell",
		role: "Member",
	},
	{
		id: 153,
		name: "Adam Wathan",
		role: "Member",
	},
	{
		id: 163,
		name: "Duke Street Studio Inc.",
		role: "Developer",
	},
	{
		id: 173,
		name: "Taylor Otwell",
		role: "Member",
	},
	{
		id: 183,
		name: "Adam Wathan",
		role: "Member",
	},
	{
		id: 193,
		name: "Duke Street Studio Inc.",
		role: "Developer",
	},
	{
		id: 222,
		name: "Adam Wathan",
		role: "Member",
	},
	{
		id: 2222,
		name: "Duke Street Studio Inc.",
		role: "Developer",
	},
	{
		id: 2222223,
		name: "Taylor Ot ",
		role: "Member",
	},
	{
		id: 22223,
		name: "Adam Wathan",
		role: "Member",
	},
	{
		id: 22233,
		name: "Duke Street Studio Inc.",
		role: "Developer",
	},
	{
		id: 22243,
		name: "Taylor Otwell",
		role: "Member",
	},
	{
		id: 22253,
		name: "Adam Wathan",
		role: "Member",
	},
	{
		id: 22263,
		name: "Duke Street Studio Inc.",
		role: "Developer",
	},
	{
		id: 22273,
		name: "Taylor Otwell",
		role: "Member",
	},
	{
		id: 22283,
		name: "Adam Wathan",
		role: "Member",
	},
	{
		id: 22293,
		name: "Last elemetn.",
		role: "Developer",
	},
];

interface Props extends HTMLAttributes<HTMLDivElement> {
	parentRef: React.MutableRefObject<HTMLDivElement | null>;
	inputRef: React.MutableRefObject<HTMLInputElement> | undefined;
}
const SearchForFriends: FC<Props> = ({ parentRef, inputRef }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const suggestions = useFuse(searchTerm, People, {
		keys: ["name"],
	});

	return (
		<Container className="w-full h-full  p-0 z-10">
			<div className="px-4 py-2">
				<div className="inline-block h-full w-full relative items-center">
					<Input
						ref={inputRef}
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search..."
						className="w-full h-full text-white/90 pr-16"
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								bounce(parentRef);
							}
						}}
					/>
					<ShortcutKeys
						keys={["⌘", "/"]}
						className="absolute right-2 bottom-1/2 translate-y-1/2  h-10 py-2"
					/>
				</div>
			</div>

			<ScrollArea className="my-2 h-4/5 first:mt-4">
				<div className="h-1"></div>
				{searchTerm
					? suggestions.map((suggestion, index) => (
							<Person
								key={suggestion.id}
								tabIndex={index}
								avatar={
									<ImageWithFallback
										loader={({ src }) => {
											if (index % 2 === 0)
												return src + "g=male";
											else return src + "g=female";
										}}
										src="https://xsgames.co/randomusers/avatar.php?"
										alt="Profile picture"
										className="rounded-full w-8 h-8"
										width={32}
										height={32}
									/>
								}
							>
								{suggestion.name}
							</Person>
					  ))
					: People.map((person, index) => (
							<Person
								key={person.id}
								avatar={
									<ImageWithFallback
										loader={({ src }) => {
											if (index % 2 === 0)
												return src + "g=male";
											else return src + "g=female";
										}}
										src="https://xsgames.co/randomusers/avatar.php?"
										alt="Profile picture"
										className="rounded-full w-8 h-8"
										width={32}
										height={32}
									/>
								}
							>
								{person.name}
							</Person>
					  ))}
				<div className="h-10"></div>
			</ScrollArea>
		</Container>
	);
};

interface PersonType extends HTMLAttributes<HTMLDivElement> {
	avatar: React.ReactNode;
}
const Person = ({ className, children, avatar }: PersonType) => {
	return (
		<div>
			<Link
				href="/dashboard"
				className={cn(
					"flex justify-start items-center flex-nowrap cursor-pointer rounded-xl focus:ring-primary focus:ring-2 focus:outline-none text-gray-200 hover:bg-primary/70 hover:rounded-xl hover:primary h-16 p-4 mr-4 mx-4 gap-2 z-10",
					className
				)}
			>
				<Avatar className="aspect-square">{avatar}</Avatar>
				<p className="line-clamp-1">{children}</p>
			</Link>
		</div>
	);
};

export default SearchForFriends;
