import { otpRateLimiter } from "../infrastructure/rateLimiter/otpLimiter.ts";
import { generateOtp } from "../domain/otp/generateOtp.ts";
import { setOtp, getOtp, deleteOtp } from "../repositories/redis/otp.repository.ts";
import { sendNumericOtp } from "../infrastructure/twilio.otp.sender.ts";
import { hashOtpWithSalt } from "../domain/otp/hashOtp.ts";
import { verifyOtp } from "../domain/otp/verifyOtp.ts";
import env from "../config/env.ts";
import { redisConnect } from "../config/redis.ts";

await redisConnect();

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


export async function verifyOtpFlow( phone: string, enteredOtp: string ){
	
	try {
		const value = await getOtp(phone);

		if (!value){
			throw new Error("OTP not found or expired.");
		}
		const salt = value.salt;
		const hashedEnteredOtp = hashOtpWithSalt(enteredOtp, salt);
		verifyOtp(hashedEnteredOtp, value.hash);
		await deleteOtp(phone);

	} catch (err){
		console.error(err);
		throw new Error("Verify OTP failed");
	}
}
