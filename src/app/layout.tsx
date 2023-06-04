import { Providers } from "@/components/providers/Providers";
import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { StrictMode } from "react";

export const metadata = {
	title: "Chit Chat",
	description: "A safe way to communicate with your friends.",
	icons: {
		icon: "/logos/favicon.png",
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<StrictMode>
			<html lang="en" className="h-screen w-screen">
				<body
					className={`${inter.className} bg-[#333] min-h-max min-w-screen relative`}
				>
					<Providers session={await getServerSession(authOptions)}>
						{children}
					</Providers>
				</body>
			</html>
		</StrictMode>
	);
}
