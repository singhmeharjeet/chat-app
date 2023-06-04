"use client";

import React, { HTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import Logo from "../../public/images/logos/logo.png";
import { cn } from "@/lib/utils";
import UserCircle from "@/../public/images/website/user-circle (1).svg";
import account from "@/../public/images/website/account.svg";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import ImageWithFallback from "./ui/image";
import Container from "./ui/container";
import { cva, VariantProps } from "class-variance-authority";

const components: { title: string; href: string; description: string }[] = [
	{
		title: "Alert Dialog",
		href: "/",
		description:
			"A modal dialog that interrupts the user with important content and expects a response.",
	},
	{
		title: "Hover Card",
		href: "/",
		description:
			"For sighted users to preview content available behind a link.",
	},
	{
		title: "Progress",
		href: "/",
		description:
			"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
	},
	{
		title: "Scroll-area",
		href: "/",
		description: "Visually or semantically separates content.",
	},
	{
		title: "Tabs",
		href: "/",
		description:
			"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
	},
	{
		title: "Tooltip",
		href: "/",
		description:
			"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
	},
];

const _Props = cva("w-full", {
	variants: {
		variant: {
			sm: "p-2",
			md: "p-4",
			lg: "p-6",
			xl: "p-8",
			"2xl": "p-10",
			"3xl": "p-12",
		},
	},
	defaultVariants: {
		variant: "2xl",
	},
});
interface Props
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof _Props> {}

const Nav = React.forwardRef<HTMLDivElement, Props>(
	({ className, variant, ...props }, ref) => {
		const { data: session } = useSession();
		return (
			<Container
				{...props}
				ref={ref}
				className={cn(_Props({ variant: variant }), className)}
			>
				<Container className="flex flex-wrap gap-2 items-center justify-between p-0 bg-transparent backdrop-blur-xl rounded-md ">
					<Link
						href="/"
						className="flex items-center space-x-2 text-2xl font-medium dark:text-gray-100"
					>
						<Image
							src={Logo}
							alt="Chit Chat Logo"
							width={40}
							height={20}
							object-fit="contain"
							className="rounded-md"
						/>
						<span>Chit Chat</span>
					</Link>

					<Container className="flex mx-0 justify-end sm:w-auto w-full p-0">
						<NavigationMenu className="w-96 md:w-[500px] lg:w-[600px] justify-end">
							<NavigationMenuList className="gap-3 flex items-center justify-between">
								{session ? (
									<>
										<NavigationMenuItem className="flex items-center justify-center">
											<Link
												href="/dashboard/add"
												className="w-full"
												legacyBehavior
												passHref
											>
												<NavigationMenuLink
													className={cn(
														navigationMenuTriggerStyle(),
														"px-10 py-2 rounded-md w-full md:w-fit "
													)}
												>
													Add People
												</NavigationMenuLink>
											</Link>
										</NavigationMenuItem>
										<NavigationMenuItem className="flex items-center justify-center">
											<NavigationMenuTrigger className="items-center">
												{session.user.image && (
													<ImageWithFallback
														src={session.user.image}
														fallBackSrc={UserCircle}
														alt="user avatar"
														height={30}
														width={30}
														object-fit="contain"
														className="rounded-full mr-3"
													/>
												)}
												Profile
											</NavigationMenuTrigger>
											<NavigationMenuContent>
												<ul className="grid gap-3 p-6 w-full md:w-[400px] lg:grid-cols-[.75fr_1fr]">
													<li className="row-span-3">
														<NavigationMenuLink
															asChild
														>
															<Link
																className="flex h-full w-full select-none flex-col rounded-md bg-gradient-to-r from-muted/50 to-muted no-underline outline-none focus:shadow-md"
																href="/login"
															>
																<div className="flex w-full h-full lg:flex-col lg:items-start">
																	<div className="w-2/5 relative lg:h-3/5 lg:w-full">
																		<Image
																			src={
																				account
																			}
																			fill
																			alt="account picture"
																			className="rounded-md absolute p-2 top-0 object-fill object-left opacity-80"
																		/>
																	</div>
																	<div className="w-3/5 lg:h-2/5 lg:w-full flex flex-col justify-center items-start m-2 p-2">
																		<div className="text-lg font-medium">
																			Account
																		</div>
																		<p className="text-sm pr-2 leading-tight text-muted-foreground">
																			Information
																			about
																			your
																			account
																			and
																			preferences.
																		</p>
																	</div>
																</div>
															</Link>
														</NavigationMenuLink>
													</li>

													<li
														className="text-lg font-medium"
														onClick={() =>
															signOut()
														}
													>
														<Button className="w-full h-full">
															Sign Out
														</Button>
													</li>
													<ListItem
														href="/"
														title="Installation"
														className="hover:bg-gray-100"
													>
														How to install
														dependencies and
														structure your app.
													</ListItem>
													<ListItem
														href="/"
														title="Typography"
														className="hover:bg-gray-100"
													>
														Styles for headings,
														paragraphs, lists...etc
													</ListItem>
												</ul>
											</NavigationMenuContent>
										</NavigationMenuItem>
									</>
								) : (
									<>
										<NavigationMenuItem className="w-full">
											<Link
												href="/signup"
												className="w-full"
												legacyBehavior
												passHref
											>
												<NavigationMenuLink
													className={cn(
														navigationMenuTriggerStyle(),
														"px-10 py-2 rounded-md w-full md:w-fit "
													)}
												>
													Signup
												</NavigationMenuLink>
											</Link>
										</NavigationMenuItem>
										<NavigationMenuItem className="w-full">
											<Link
												href="/login"
												className="w-full"
												legacyBehavior
												passHref
											>
												<NavigationMenuLink
													className={cn(
														navigationMenuTriggerStyle(),
														"px-10 py-2 rounded-md  w-full md:w-fit "
													)}
												>
													Login
												</NavigationMenuLink>
											</Link>
										</NavigationMenuItem>
									</>
								)}
							</NavigationMenuList>

							<NavigationMenuViewport />
						</NavigationMenu>
					</Container>
				</Container>
			</Container>
		);
	}
);

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-200 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">
						{title}
					</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
export default Nav;
