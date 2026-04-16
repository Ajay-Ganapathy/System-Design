/**
 * Redis client configuration
 */

const {createClient} = require("redis");

const client = createClient({
    url:`redis://${process.env.REDIS_HOST || "localhost"}:6379`,
})

client.on("error" , (err) => {
    console.error("Redis Error : " , err);
});


(async () => {
    await client.connect();
    console.log("Connected to Redis");
})(); 

module.exports = client;