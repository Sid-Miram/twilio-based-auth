import { isRateLimited } from "../../domain/rules/isRateLimited.ts";
import { incrementAttempts } from "../../repositories/redis/rateLimiter.repository.ts"
import env from "../../config/env.ts";

/**
 * Rate limits OTP requests.
 * @param phone : used to construct the key.
 * @returns Promise of boolean type.
 */

const MAX_OTP_ATTEMPTS = env.MAX_OTP_ATTEMPTS; 
const OTP_EXPIRY_TIME = env.OTP_EXPIRY_TIME;


export async function otpRateLimiter(phone:string){

	try {
		const attempts = await incrementAttempts( phone, OTP_EXPIRY_TIME);
		return isRateLimited(attempts, MAX_OTP_ATTEMPTS );
	} catch (err){
		console.error("Rate Limiter Error: ", err);
		throw new Error("OTP service temporarily unavailable. Try again later.");
	}
}
