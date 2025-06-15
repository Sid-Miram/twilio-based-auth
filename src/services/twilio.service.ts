import {twilioClient, twilioConfig } from "../config/twilio.ts"
import type {MessageInstance} from "twilio/lib/rest/api/v2010/account/message"


/**
 * sends numeric OTP to user
 * @param phone number of receiver
 * @param numeric OTP to send
 * returns A Promise of type MessageInstance
 */ 


export async function sendNumericOtp(to: string, OTP: string) : Promise<MessageInstance> {
	return twilioClient.messages.create({
		to,
		messagingServiceSid: twilioConfig.messagingServiceSid, // Of service, i created in Twilio, which automatically finds suitable number to send message from. 
		body : `Your OTP for verification is ${OTP}`,
	})
}
