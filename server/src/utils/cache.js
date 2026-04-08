/**
 * Best-effort Redis cache helpers.
 * All operations are silent no-ops if Redis is unavailable.
 */
const redis = require("../config/redis");

/**
 * Get a cached value by key.
 * Returns the parsed value, or null on miss / error.
 */
async function get(key) {
  if (!redis) return null;
  try {
    const raw = await redis.get(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Store a value with an optional TTL (seconds).
 * Default TTL: 120 seconds.
 */
async function set(key, value, ttlSeconds = 120) {
  if (!redis) return;
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
  } catch {
    // best-effort
  }
}

/**
 * Delete one or more exact keys.
 */
async function del(...keys) {
  if (!redis || keys.length === 0) return;
  try {
    await redis.del(...keys);
  } catch {
    // best-effort
  }
}

/**
 * Delete all keys matching a glob pattern.
 * Uses SCAN to avoid blocking KEYS on large datasets.
 * Example: delPattern("progress:dashboard:abc123:*")
 */
async function delPattern(pattern) {
  if (!redis) return;
  try {
    let cursor = "0";
    const toDelete = [];
    do {
      const [next, found] = await redis.scan(cursor, "MATCH", pattern, "COUNT", 200);
      cursor = next;
      toDelete.push(...found);
    } while (cursor !== "0");

    if (toDelete.length > 0) {
      await redis.del(...toDelete);
    }
  } catch {
    // best-effort
  }
}

module.exports = { get, set, del, delPattern };
