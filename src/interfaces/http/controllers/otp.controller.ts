import { Request, Response } from "express";
import { initiateOtpFlow, verifyOtpFlow } from "../../../services/otp.service.ts";

export async function sendOtpController(req: Request, res: Response ) : Promise<Response> {
	const { phone } = req.body

	if (!phone){
		return res.status(400).json({ error: "Phone number is required."});
	}

	try {
		await initiateOtpFlow(phone);
		return res.status(200).json({ message: "OTP sent successfully." })

	} catch (err : any ){
		return res.status(500).json({ error : err.message || "Failed to send OTP."});
	}
}


export async function verifyOtpController(req: Request, res: Response) : Promise<Response> {
	const { phone, otp } = req.body;

	if (!phone || !otp){
		return res.status(400).json({ error: "Phone number and OTP are required."});
	}

	try {
		await verifyOtpFlow(phone, otp);
		return res.status(200).json({ message: "OTP verified successfully."});
	} catch (err:any){
		return res.status(500).json({ error : err.message || "Failed to verify OTP."});
	}
}
