import { createClient } from "redis";
import env from "./env.ts"




const redisClient = createClient({
	url : env.REDIS_URL
});

redisClient.on("error", err => console.log("Redis Client Error", err));


/**
 * used to connect to redis server
 * returns a promise of void type
 */

async function redisConnect() : Promise<void> {
	try {
		await redisClient.connect();
		console.log("🛰️ Redis link established")
	} catch (err) {
		console.error("👻 Redis ghosted us", err)
	}
}

export {redisClient, redisConnect};
