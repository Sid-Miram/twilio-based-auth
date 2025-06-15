

/**
 * verifies if OTP from user is same as actualOTP
 * @param enteredOTP - OTP sent by user for verification
 * @param actualOTP - Actual OTP that should match with enteredOTP
 * @returns boolean value of True if matches, otherwise, throws an error 
 * @throws Error when OTPs are invalid or missing.
 */ 


export function verifyOtp(enteredOTP : string, actualOTP: string) : boolean {
	if (!enteredOTP || !actualOTP ){
		throw new Error (`OTP missing: Both user and actual OTP is required`);
	}

	if (enteredOTP != actualOTP){
		throw new Error (`Invalid OTP: The OTP entered is incorrect.`);
	}

	return true;
}
