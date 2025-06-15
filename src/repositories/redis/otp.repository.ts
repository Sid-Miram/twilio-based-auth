import { redisClient } from "../../config/redis.ts";
import { generateSalt, hashOtpWithSalt } from "../../domain/otp/hashOtp.ts";


/**
 * function to set OTP in DB/Redis
 * @param phone => phonenumber used to construct a key.
 * @param OTP : raw OTP to hash and set in redis
 * @param exp : to set expiry of key in redis, in seconds (default:3000s)
 * returns nothing, just a Promise which resolves to nothing.
*/ 



export async function setOtp( phone: string, otp : string, exp = 300 ) : Promise<void>{
	const salt = generateSalt(32);
	const hash = hashOtpWithSalt(otp, salt);

	const data = JSON.stringify({salt, hash});

	const redisKey = `otp:${phone}`;
	try{
	await redisClient.set(redisKey, data, {"EX" : exp});
	} catch (err){
		console.error("Failed to store hashed OTP", err);
		throw new Error("Redis OTP store failed");
	}

}


/*
 * function to retrieve hashed otp and salt from Redis/DB
 * @param phone => phone number used to construct a key
 * @returns Promise of type JSON which includes salt, hash, otherwise null value
 */

export async function getOtp( phone: string ): Promise<{salt: string, hash: string } | null>{
	const redisKey = `otp:${phone}`;
	const raw = await redisClient.get(redisKey)
	
	if (!raw) return null;

	try{
		return JSON.parse(raw);
	} catch(err) {
		return null;
	}
}

/*
 * deletes otp associated with phone number from redis db
 * @param phone : phone number that is used to construct redis key
 * returns Promise of void type
*/

export async function deleteOtp(phone:string) : Promise<void>{
	const redisKey = `otp:${phone}`

	try {
		const result = await redisClient.del(redisKey)
		if ( result == 0 ){
			console.warn(`No OTP found to delete for phone: ${phone}`);
		}
	} catch (err){
		console.error(`Failed to delete OTP for ${phone}`, err);
	}
}
