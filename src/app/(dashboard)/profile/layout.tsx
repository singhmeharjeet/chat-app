import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/sidebar-nav";
import Container from "@/components/ui/container";
import { X } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Forms",
	description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
	{
		title: "Profile",
		href: "/profile",
	},
	{
		title: "Appearance",
		href: "/profile/appearance",
	},
	{
		title: "Notifications",
		href: "/profile/notifications",
	},
];

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
	return (
		<Container className="space-y-6 p-10 pb-16 md:block bg-secondary/60 min-h-screen">
			<div className="flex justify-between items-center w-full">
				<div className="space-y-0.5">
					<h2 className="text-white/90 text-2xl font-bold tracking-normal">
						Settings
					</h2>
					<p className="text-white/80">
						Manage your account settings and set e-mail preferences.
					</p>
				</div>

				<Link
					href="/dashboard"
					className="text-white px-4 py-2 hover:bg-transparent hover:ring-2 hover:dark:ring-destructive flex gap-2 items-center rounded-lg"
				>
					<X className="w-6 h-6 text-destructive/80" />
				</Link>
			</div>
			<Separator className="my-6" />
			<div className="flex flex-col h-full space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 overflow-y-scroll">
				<aside className="lg:w-1/5">
					<SidebarNav items={sidebarNavItems} />
				</aside>

				<div className="flex-1 lg:max-w-2xl">{children}</div>
			</div>
		</Container>
	);
}
