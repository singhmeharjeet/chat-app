import SignupForm from "@/components/SignupForm";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

import React from "react";

async function page() {
	const session = await getServerSession();
	if (session) {
		redirect("/dashboard");
	}
	return (
		<Container className="min-h-screen bg-gradient-dark">
			<div className="mt-5 mx-4 md:mx-auto max-w-2xl p-5 rounded-md shadow-md bg-slate-600/20 backdrop-blur-3xl border-[10px] border-accent/10">
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

				<h1 className="text-3xl text-center py-8 text-white/95 font-semibold tracking-normal">
					Create an Account
				</h1>
				<SignupForm />

				<div className="w-full flex justify-center items-center">
					<Button
						variant="link"
						size="sm"
						className="text-center w-full sm:w-[40%] flex p-0"
					>
						<Link
							tabIndex={-1}
							className="w-full h-full text-sm font-medium text-white/80 align-baseline px-4 py-2 rounded-md border-2 border-transparent grow flex items-center justify-center"
							href="/login"
						>
							Already have an accout ?{" "}
							<ArrowUpRight className="h-4 aspect-square text-primary" />
						</Link>
					</Button>
				</div>
			</div>
		</Container>
	);
}

export default page;
