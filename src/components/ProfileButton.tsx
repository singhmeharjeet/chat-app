"use client";

import React, { FC, HTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import UserCircle from "@/../public/images/website/user-circle (1).svg";
import account from "@/../public/images/website/account.svg";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

import ImageWithFallback from "./ui/image";
import { Popover, PopoverTrigger } from "./ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Label } from "./ui/label";
import { Avatar } from "./ui/avatar";

interface ProfileButtonProps extends HTMLAttributes<HTMLDivElement> {}
const ProfileButton: FC<ProfileButtonProps> = () => {
	const { data: session } = useSession();
	return (
		<Popover>
			<PopoverTrigger
				className={cn(
					"w-fit h-full p-2 rounded-md",
					"flex items-center justify-center",
					"cursor-pointer",
					"text-white",
					""
				)}
			>
				{session && session.user.image && session.user.name && (
					<>
						<Avatar className="w-9 h-9 fill">
							<ImageWithFallback
								src={session.user.image}
								fallBackSrc={UserCircle}
								alt="user avatar"
								height={80}
								width={80}
								object-fit="contain"
								className="rounded-full"
							/>
						</Avatar>
						<Label className="px-2 font-normal w-full flex flex-wrap cursor-pointer">
							<span className="hover:no-underline py-1 cursor-pointer font-semibold tracking-tight">
								Welcome{", "}
							</span>
							{session.user.name.substring(
								0,
								session.user.name.indexOf(" ")
							)}
						</Label>
					</>
				)}
			</PopoverTrigger>

			<PopoverContent
				align="start"
				className="z-[99999] grid gap-3 mb-2 p-2 bg-secondary w-full rounded-xl shadow-lg"
			>
				<ListItem href="/profile" className="p-6">
					<div className="flex w-full h-full">
						<div className="w-3/5 lg:h-2/5 lg:w-full flex flex-col justify-center items-start">
							<Label
								variant="white"
								className="text-lg font-medium cursor-pointer"
							>
								Profile
							</Label>
							<p className="text-sm pr-2 leading-tight text-muted-foreground">
								Information about your account and preferences.
							</p>
						</div>
						<div className="w-2/5 relative">
							<Image
								src={account}
								fill
								alt="account picture"
								className="rounded-md absolute p-2 top-0 object-fill object-left opacity-80"
							/>
						</div>
					</div>
				</ListItem>
				<ListItem
					onClick={() => signOut()}
					title="Sign Out"
					className="hover:ring-destructive p-6 focus:ring-destructive active:ring-destructive"
				></ListItem>
			</PopoverContent>
		</Popover>
	);
};

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href = "#", ...props }, ref) => {
	return (
		<div className="p-0 h-full w-full">
			<Link
				href={href}
				ref={ref}
				className={cn(
					"block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-accent-foreground h-full w-full",
					"hover:ring-2 duration-300 transition-all animate-in hover:ring-white focus:ring-2 focus:ring-white hover:cursor-pointer",
					className
				)}
				{...props}
			>
				<div className="text-[1rem] font-medium leading-none text-white/90">
					{title}
				</div>
				<div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
					{children}
				</div>
			</Link>
		</div>
	);
});
ListItem.displayName = "ListItem";

export default ProfileButton;
