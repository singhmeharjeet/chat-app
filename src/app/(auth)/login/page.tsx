"use client";
import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { HorizontalDivider } from "@/components/ui/divider";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import google from "@/../public/images/brands/google.svg";
import Container from "@/components/ui/container";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { redirect } from "next/navigation";

export default function Login() {
	const { data: session, status } = useSession();
	if (session && status === "authenticated") {
		redirect("/dashboard");
	}

	const [loading, setLoading] = useState({
		google: false,
		discord: false,
		github: false,
		credentials: false,
	});

	async function handleGoogleLogIn() {
		setLoading({ ...loading, google: true });

		try {
			const res = await signIn("google", {
				redirect: true,
				callbackUrl: "/",
			});
		} catch (error) {
			toast.error("Something went wrong with your login.");
		} finally {
			toast.success("Successfully logged in! Redirecting...");
			setLoading({ ...loading, google: false });
		}
	}

	return (
		<Container className="bg-gradient-dark-inverse min-h-screen">
			<div className="bg-slate-600/20 h-fit flex flex-col gap-1 justify-center items-center w-[90%] max-w-2xl  mx-auto p-5 ring-3 ring-transparent rounded-lg shadow-2xl backdrop-blur-lg border-[10px] border-accent/10 relative">
				<Button
					className="absolute top-[1%] left-[1%] p-0 underline-offset-8"
					variant="link"
				>
					<Link
						href="/"
						className="flex items-center justify-start gap-3 px-4 py-2 text-white/90"
					>
						<ArrowLeft />
						Home Page
					</Link>
				</Button>
				<Image
					src="/logos/logo_transparent.png"
					alt="Logo"
					width={350}
					height={350}
					object-fit="contain"
					className="min-w-[10rem] w-full max-w-[15rem] aspect-square rounded-xl"
				/>

				<Label className="w-full mb-2 font-semibold">
					Sign in using
				</Label>
				<div className="flex flex-wrap gap-2">
					<Button
						variant="secondary"
						className="sm:w-56 grow flex justify-start gap-3"
						onClick={() => handleGoogleLogIn()}
						isLoading={loading.google}
						disabled={loading.google}
					>
						<Image
							src={google}
							alt="Google Logo"
							width={22}
							height={22}
							object-fit="contain"
							className="h-9 w-auto -ml-1"
						></Image>
						Sign in with Google
					</Button>
					<Button
						variant="secondary"
						className="sm:w-56 grow flex justify-start gap-4"
						onClick={(e) => {
							setLoading({ ...loading, discord: true });
							signIn("discord");
							setLoading({ ...loading, discord: false });
						}}
						isLoading={loading.discord}
					>
						<>
							<Image
								src="/brands/discord-mark-white.png"
								alt="Discord Logo"
								width={22}
								height={22}
								object-fit="contain"
								className="h-5 w-auto"
							></Image>
							Sign in with Discord
						</>
					</Button>
					<Button
						variant="secondary"
						className="sm:w-56 grow flex justify-start gap-4"
						onClick={(e) => {
							setLoading({ ...loading, github: true });
							signIn("github");
							setLoading({ ...loading, github: false });
						}}
						isLoading={loading.github}
					>
						<Image
							src="/brands/github-mark-white.png"
							alt="Github Logo"
							width={22}
							height={22}
							object-fit="contain"
							className="h-6 w-auto"
						></Image>
						Sign in with Github
					</Button>
				</div>

				<HorizontalDivider width="full" height="sm" className="m-3" />
				<LoginForm />
				<Button
					variant="link"
					size="sm"
					className="text-center w-full sm:max-w-[40%] p-0 flex mt-2"
				>
					<Link
						tabIndex={-1}
						className="w-full h-full text-sm font-medium text-white/80 align-baseline px-4 py-2 rounded-md border-2 border-transparent grow flex items-center justify-center"
						href="#test"
					>
						Forgot Password?
						<ArrowUpRight className="h-4 aspect-square text-primary" />
					</Link>
				</Button>
				<Button
					variant="link"
					size="sm"
					className="text-center w-full sm:w-[40%] flex p-0"
				>
					<Link
						tabIndex={-1}
						className="w-full h-full text-sm font-medium text-white/80 align-baseline px-4 py-2 rounded-md border-2 border-transparent grow flex items-center justify-center "
						href="/signup"
					>
						Create an Account!
						<ArrowUpRight className="h-4 aspect-square text-primary" />
					</Link>
				</Button>
			</div>
		</Container>
	);
}
