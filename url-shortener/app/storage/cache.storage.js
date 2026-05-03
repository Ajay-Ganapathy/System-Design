/**
 * Combines Redis (cache) + PostgreSQL (DB)
 */
class CacheStorage {
  constructor(redis, db) {
    this.redis = redis;
    this.db = db;
  }

  async set(key, value, ttlSeconds) {
    // Write to DB first
    await this.db.set(key, value, ttlSeconds);

    // Then cache it
    await this.redis.set(key, value, ttlSeconds);
  }

  async get(key) {
    // 1. Check Redis
    const cached = await this.redis.get(key);
    if (cached) {
        console.log("Returned from Redis Cache")
        return cached;
    }

    // 2. Fetch from DB
    const value = await this.db.get(key);
    if (!value){
        return null;
    } 

    // 3. Backfill cache
    await this.redis.set(key, value, { EX: 3600 });

    return value;
  }

  async exists(key) {
    
    const cached = await this.redis.get(key);
    if (cached){
        return true;
    } 

    return this.db.exists(key);
  }
}

module.exports = CacheStorage;