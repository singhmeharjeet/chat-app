import { Redis } from "@upstash/redis";

function getRedisVariables() {
	const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
	const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
	if (
		!redisUrl ||
		redisUrl.length === 0 ||
		!redisToken ||
		redisToken.length === 0
	) {
		throw new Error(
			"Missing REDIS_URL or REDIS_TOKEN environment variables"
		);
	}
	return { redisUrl, redisToken };
}
export const db = new Redis({
	url: getRedisVariables().redisUrl,
	token: getRedisVariables().redisToken,
});
