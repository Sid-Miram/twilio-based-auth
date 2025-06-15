import { Router } from "express";
import { sendOtpController, verifyOtpController } from "../controllers/otp.controller.ts";

const otpRouter = Router();


otpRouter.post("/send-otp", sendOtpController);
otpRouter.post("/verify-otp", verifyOtpController);
otpRouter.get("/checkhealth", (req,res) => res.status(200).json({success: "Life is Connected"}));

export default otpRouter;
