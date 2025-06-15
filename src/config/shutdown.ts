import {redisClient} from "./redis.ts"

/**
 * Setup gracefully shudown
*/ 



export function setupGracefulShutdown(){

	const shutdown = async () => {
		try {
			console.log("🌊 Gracefully Shutting down...")
			if (redisClient.isOpen){
				await redisClient.quit();
				console.log("🧯 Redis safely disconnected.")
			}

			process.exit(0);

		} catch (err){
			console.error("🔻Error during Graceful shutdown:", err)
			process.exit(1);
		}
	}

	process.on("SIGINT", shutdown); // SIGINT is signal interrupt send when there is manual interruption from user like pressing Ctrl+C
	process.on("SIGTERM", shutdown); // SIGTERM is signal terminate send by another program or system, polite way to ask it to terminate

	// Shutdown because of uncaught exceptions
	process.on("uncaughtException", (err) => {
		console.error("🤯 Uncaught Exception: ", err);
		shutdown();
	})

	// Shutdown because of unhandled rejection
	process.on("unhandledRejection", (reason) => {
		console.error("💔 Unhandled Rejection: Tuta Tuta Ek parinda aise tuta, fir juda na paya, kyu rutha? ", reason);
		shutdown();
	})
	
}
