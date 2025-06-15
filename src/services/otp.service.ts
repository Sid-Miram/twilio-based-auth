import { otpRateLimiter } from "../infrastructure/rateLimiter/otpLimiter.ts";
import { generateOtp } from "../domain/otp/generateOtp.ts";
import { setOtp } from "../repositories/redis/otp.repository.ts";
import { sendNumericOtp } from "../infrastructure/twilio.otp.sender.ts";
import env from "../config/env.ts";


const expiryTime = env.OTP_EXPIRY_TIME




export async function initiateOtpFlow( phone : string ){
	
	try {
		const isRateLimited = await otpRateLimiter(phone);
		if (isRateLimited){
			throw new Error(`Too many OTP requests. Please try again after ${expiryTime/60} min.`);
		}
		const otp = generateOtp();
		await setOtp(phone, otp, expiryTime);
		await sendNumericOtp(phone, otp);

	} catch (err){
		console.error("Failed to initiate OTP flow", err);
		throw new Error("Failed to send OTP. Please try again later.");
	}
}
