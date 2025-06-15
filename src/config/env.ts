import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";



// Manually specifying the path to the .env file so that it gets loaded correctly
// regardless of where the script is executed from. This avoids issues caused by
// changes in the current working directory (cwd), since dotenv by default looks 
// for the .env file relative to the cwd, not the file location.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path: path.resolve(__dirname, "../../.env")});

/**
 * imports environment variables 
 * @param name of the environment variable
 * @returns value of environment variable if exists
 */ 


function getEnv(name : string) : string {
	const value = process.env[name];

	if (!value){
		throw new Error (`Missing Environment Variable: ${name}`);
	}

	return value;
}


const env : Record<string, string> = {
	TWILIO_ACCOUNT_SID : getEnv("TWILIO_ACCOUNT_SID"),
	TWILIO_AUTH_TOKEN : getEnv("TWILIO_AUTH_TOKEN"),
	TWILIO_MESSAGING_SERVICE_SID: getEnv("TWILIO_MESSAGING_SERVICE_SID")
}

export default env;
