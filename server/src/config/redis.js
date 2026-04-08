const Redis = require("ioredis");
const env = require("./env");

let client = null;

if (env.redisUrl) {
  client = new Redis(env.redisUrl, {
    maxRetriesPerRequest: 0,      // fail fast — don't block the request
    connectTimeout: 3000,
    enableOfflineQueue: false,    // drop commands while disconnected instead of queuing
    lazyConnect: false,
  });

  client.on("error", () => {
    // Suppress — cache is best-effort, app works without it
  });

  client.on("connect", () => {
    if (env.nodeEnv !== "production") {
      console.log("[Redis] Connected");
    }
  });
} else {
  if (env.nodeEnv !== "production") {
    console.log("[Redis] REDIS_URL not set — caching disabled");
  }
}

module.exports = client;
