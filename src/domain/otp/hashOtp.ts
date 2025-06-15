import { createHash, randomBytes } from "crypto"

/**
 * a function which generates a random string/salt
 * @param length of salt in bytes. Default is 16
 * @returns Hex encoded string (2 character per byte)
 */

export function generateSalt(length=16) : string {
	return randomBytes(length).toString('hex'); // returns 32 character string by default
}

/**
 * a function to hash OTP with given salt with SHA256 algo.
 * @param OTP to hash
 * @param salt =>  to hash OTP with salt.
 * @returns hex-encoded SHA256 hash of salt + OTP.
 */ 

export function hashOtpWithSalt( otp: string, salt: string ) : string {
	const hash = createHash("sha256");
	hash.update( salt + otp  );
	return hash.digest("hex");
}
