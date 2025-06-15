import crypto from "crypto"

/**
 * generate a secure numeric OTP
 * @param length Number of digits (default 4)
 * @returns a numeric OTP as string. 
 */


export function generateOtp( length = 4 ) : string {
	if (length < 4 || length > 8){
		throw new Error ("OTP length must be between 4 and 8 digits");
	}

	const min = 10 ** (length-1);
	const max = (10 **  length)  - 1;

	return crypto.randomInt(min, max+1).toString();
}

