import { redisClient, redisConnect } from "../../config/redis.ts";

/**
 * increase attempts count by 1
 * @param phone : used to construct key.
 * @param expiry time in seconds
 * @returns number.
 */

export async function incrementAttempts( phone : string, exp : number) : Promise<number> {
	const redisKey = `otp:attempts:${phone}`;

	try {
		const attempts = await redisClient.incr(redisKey);
		await redisClient.expire(redisKey, exp);
		return attempts;
	} catch (err){
		console.error("Failed to increment OTP attempts", err);
		throw new Error("Something went wrong while sending OTP. Please try again");
	}
}
