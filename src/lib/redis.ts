const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

type Command = "zrange" | "sismember" | "get" | "smembers";

export async function fetchRedis(
	command: Command,
	...args: (string | number)[]
) {
	const response = await fetch(`${url}/${command}/${args.join("/")}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error(`Error is Redis Fetch : ${response.statusText}`);
	}

	return await response.json();
}
