import env from "./env"
import twilio from "twilio"



// settings and environment variables



export const twilioConfig = {
	accountSid: env.TWILIO_ACCOUNT_SID,
	authToken: env.TWILIO_AUTH_TOKEN,
	messagingServiceSid: env.TWILIO_MESSAGING_SERVICE_SID,
}

export const twilioClient = twilio(twilioConfig.accountSid, twilioConfig.authToken);
