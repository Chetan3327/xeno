import { createClient } from "redis";

const redisClient = createClient({ url: "redis://localhost:6379" });

redisClient.connect();

export const publishMessage = async (channel, message) => {
  await redisClient.publish(channel, JSON.stringify(message));
};
