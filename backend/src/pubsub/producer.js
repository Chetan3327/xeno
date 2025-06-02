import { createClient } from "redis";
import dotenv from 'dotenv'
dotenv.config()

const REDIS_URL = process.env.REDIS_URL
console.log("REDIS_URL", REDIS_URL)
const redisClient = createClient({ url: REDIS_URL });

redisClient.connect();

export const publishMessage = async (channel, message) => {
  await redisClient.publish(channel, JSON.stringify(message));
};
