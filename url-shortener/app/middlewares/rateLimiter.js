const redis = require("../config/redis");

/**
 * Rate limiter middleware
 * Limits requests per IP
 */

const rateLimiter = async (req , res , next) => {
    const ip = req.ip;

    // Use Route Pattern
    const route = req.path;
    const key = `Rate:${ip}:${route}`;

    try{
        const current = await redis.get(key);
        if(current && parseInt(current) >= 5){
            return res.status(429).json({
                error : "Too many requests. Try again later"
            });
        }

        if(current){
            // increment count
            await redis.incr(key);
        }else{
            // Sets First Request with TTL of 60 seconds
            await redis.set(key , 1, {EX:60});
        }

        next();

    }catch(err){
        console.log("Rate Limiter Error : " , err);
        next();
    }
}

module.exports = rateLimiter;
