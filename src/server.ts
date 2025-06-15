import express from "express";
import { redisConnect } from "./config/redis.ts";
import { setupGracefulShutdown }from "./config/shutdown.ts";
import env from "./config/env.ts"
import otpRouter from "./interfaces/http/routes/otp.routes.ts"; 

const app = express();
const PORT = env.PORT || 3000;

// middlewares
app.use(express.json());
app.use("/api/otp", otpRouter);



// server listening

try {
	await redisConnect();
	app.listen(PORT, () => console.log("Server started!!"));
	setupGracefulShutdown(); // graceful shutdown setup 
 
} catch (err){
	console.error("Server did not start properly:", err)
}
