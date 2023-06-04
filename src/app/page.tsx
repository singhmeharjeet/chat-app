"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Container from "@/components/ui/container";
import Nav from "@/components/Nav";
import SectionTitle from "@/components/ui/sectionTitle";
import Benefits from "@/components/ui/benefits";
import Footer from "@/components/Footer";
import {
	FaceSmileIcon,
	ChartBarSquareIcon,
	CursorArrowRaysIcon,
	DevicePhoneMobileIcon,
	AdjustmentsHorizontalIcon,
	SunIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "@/../public/images/website/hero-2.svg";
import benefitTwoImg from "@/../public/images/website/hero-3.svg";
import Hero from "@/components/Hero";

const benefitOne = {
	title: "Dynamic Chatting",
	desc: "Experience the thrill of real-time conversations that feel alive. Chit Chat's lightning-fast messaging platform ensures seamless and instant communication, keeping you engaged and connected.",
	image: benefitOneImg,
	bullets: [
		{
			title: "Intelligent Notifications",
			desc: "Stay in the loop without being overwhelmed. Chit Chat's smart notification system ensures you never miss an important message.",
			icon: <FaceSmileIcon />,
		},
		{
			title: "Expressive Emojis",
			desc: "Add a splash of emotion to your conversations.From smiles to tears, laughter to surprise, convey your true feelings with just a tap.",
			icon: <ChartBarSquareIcon />,
		},
		{
			title: "Group Chats and Communities",
			desc: "Dive into vibrant communities or create your own groups to connect with like-minded people. And build connections that transcend boundaries.",
			icon: <CursorArrowRaysIcon />,
		},
	],
};

const benefitTwo = {
	title: "Commmmmmmming Soon...",
	desc: "",
	image: benefitTwoImg,
	bullets: [
		{
			title: "Immersive Video Calls",
			desc: "Break the boundaries of distance with Chit Chat's immersive video calling feature. Connect face-to-face with friends, family, or colleagues, and experience the joy of being together, no matter where you are.",
			icon: <DevicePhoneMobileIcon />,
		},
		{
			title: "Multi-Media Sharing",
			desc: "Share your favorite photos, videos, and GIFs with friends and family. Chit Chat's multi-media sharing feature lets you share your favorite moments with the people you love, instantly.",
			icon: <AdjustmentsHorizontalIcon />,
		},
		{
			title: "High Contrast Mode",
			desc: "It will ensure a comfortable viewing experience, especially in low-light environments. Giving you the freedom to chat anytime, anywhere without straining your eyes.",
			icon: <SunIcon />,
		},
	],
};

export default async function Page() {
	const session = useSession();
	session && session.status === "authenticated"
		? redirect("/dashboard")
		: null;

	return (
		<>
			<Container className="bg-gradient-dark p-0">
				<Nav />
				<Hero />
			</Container>
			<Container className="bg-gradient-dark w-full h-fit">
				<SectionTitle
					className="items-start w-full"
					title="Welcome to Chit Chat"
				>
					The ultimate chat app designed to bring your conversations
					to life! With its innovative features and intuitive
					interface, Chit Chat revolutionizes the way we connect and
					communicate. Get ready to embark on an exciting journey of
					limitless connections, vibrant communities, and
					unforgettable shared moments.
				</SectionTitle>
				<Benefits data={benefitOne} />
			</Container>
			<Container className="bg-gradient-dark w-full h-auto min-h-screen flex flex-col p-0">
				<Benefits imgPos="right" data={benefitTwo} className="p-16" />
				<Footer className="bg-[#333] grow" />
			</Container>
		</>
	);
}
