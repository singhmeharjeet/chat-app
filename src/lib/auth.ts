import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import { db } from "./db";

import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	adapter: UpstashRedisAdapter(db),
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",
	},

	providers: [
		GoogleProvider({
			clientId: getGoogleCredentials().clientId,
			clientSecret: getGoogleCredentials().clientSecret,
		}),
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID!,
			clientSecret: process.env.DISCORD_CLIENT_SECRET!,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		}),
		Credentials({
			name: "Credentials",
			credentials: {},
			async authorize(credentials: any, req) {
				console.log("credentials", credentials);
				console.log("req", req);

				const user = (await db.get(`user:${credentials.id}`)) as User;

				if (!user) {
					return null;
				}

				return null;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			// When the user joins for the first time the adapter will create a new user
			// in the database. If the user already exists, the adapter will fetch it.
			// The adapter will also generate a token.id for the user.

			// check if the user already exists in the database
			const dbuser = (await db.get(`user:${token.id}`)) as User | null;

			// if the user does not exist, we will create it
			if (!dbuser) {
				token.id = user.id;
				return token;
			}

			// if the user exists, we will update the token to add
			// the details from the database
			return {
				id: dbuser.id,
				name: dbuser.name,
				email: dbuser.email,
				picture: dbuser.image,
			};
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.image = token.picture;
			}
			return session;
		},
		redirect() {
			return "/dashboard";
		},
	},
};

function getGoogleCredentials() {
	const clientId = process.env.GOOGLE_CLIENT_ID;
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
	if (
		!clientId ||
		clientId.length === 0 ||
		!clientSecret ||
		clientSecret.length === 0
	) {
		throw new Error(
			"Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variables"
		);
	}
	return { clientId, clientSecret };
}
