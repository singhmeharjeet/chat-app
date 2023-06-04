"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

type Props = {
	children?: React.ReactNode;
	session: Session | null;
};

export const Providers = ({ children, session }: Props) => {
	return (
		<SessionProvider session={session} refetchInterval={5 * 60}>
			<Toaster position="top-center" reverseOrder={false} />
			{children}
		</SessionProvider>
	);
};
