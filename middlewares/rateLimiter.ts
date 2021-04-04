import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";

import redis from "redis";

const redisClient = redis.createClient();

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimit",
  points: 5,
  duration: 1
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (error) {
    return response.status(429).json({message: "Too many requests", error});
  }
}