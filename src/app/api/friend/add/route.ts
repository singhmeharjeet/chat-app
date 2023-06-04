import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { fetchRedis } from "@/lib/redis";
import { AddFriendSchema } from "@/lib/validation/add-friend";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { ZodError } from "zod";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { email: emailToAdd } = AddFriendSchema.parse(body);

		// 1. Who is the sender?
		const session = await getServerSession(authOptions);
		if (!session) {
			return new Response("Unauthorized", { status: 401 });
		}

		// 2. Who is the recipient?
		const recipientID = (
			await fetchRedis("get", `user:email:${emailToAdd}`)
		).result as string | null;

		console.table({ recipientID, session });
		// 2.1. Does the recipient exist?
		if (recipientID === null) {
			return new Response("User does not exist", { status: 404 });
		}

		// 2.2. Is the recipient the sender?
		if (recipientID === session.user.id) {
			return new Response("Cannot add yourself as a friend", {
				status: 404,
			});
		}

		// 3.1. Is friend Request already sent?
		const isFriendRequestSent = (await fetchRedis(
			"sismember",
			`user:${recipientID}:incoming_friend_requests`,
			session.user.id
		)) as Boolean;

		if (isFriendRequestSent) {
			return new Response("Friend request already sent", { status: 400 });
		}

		// 3. Is the sender already friends with the recipient?
		const isFriend = (await fetchRedis(
			"sismember",
			`user:${session.user.email}:friends`,
			session.user.id
		)) as Boolean;

		if (isFriend) {
			return new Response("Already friends", { status: 400 });
		}

		// 4. Send friend request
		db.sadd(
			`user:${recipientID}:incoming_friend_requests`,
			session.user.id
		);
		return new Response("Friend request sent", { status: 200 });
	} catch (err: any) {
		if (err instanceof AxiosError) {
			console.log("Axios error");
			console.table(err);
			return new Response(err.message, { status: 404 });
		}
		if (err instanceof ZodError) {
			console.log("Zode error");
			console.table(err);
			return new Response("Invalid Request Payload: ", { status: 500 });
		} else {
			console.log("Unknown error", err);
			return new Response("Unknown error", { status: 500 });
		}
	}
}
