import env from "../../config/env.ts";


/**
 * checks if rate is limited.
 * @param currentCount.
 * @param maxCount: Maximum count before rate limited (default: set by env).
 * @returns true if rate is limited, else false.
 */


export function isRateLimited(currentCount: number, maxCount = 3) : boolean {
	return currentCount > maxCount;
}
