import express from "express";
import { redisConnect } from "./config/redis.ts";
import { setupGracefulShutdown }from "./config/shutdown.ts";
import env from "./config/env.ts"

const app = express();
const PORT = env.PORT | 3000;


// server listening

try {
	await redisConnect();
	app.listen(PORT, () => console.log("Server started!!"));
} catch (err){
	console.error("Server did not start properly:", err)
}

// graceful shutdown setup 

setupGracefulShutdown(); 
