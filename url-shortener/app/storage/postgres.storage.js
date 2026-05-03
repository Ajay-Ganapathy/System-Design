const Storage = require("./storage.interface");
const pool = require("../config/db");

class PostgresStorage extends Storage{
    
    async set(key , value , ttlSeconds=null){
            let expiry = null;
            if(ttlSeconds){
                expiry = new Date(Date.now() + ttlSeconds * 1000);
            }

            await pool.query(
        `INSERT INTO urls (short_code, long_url, expiry)
        VALUES ($1, $2, $3)`,
        [key, value, expiry]
        );
    }


    async get(key) {
    const res = await pool.query(
      `SELECT long_url, expiry FROM urls WHERE short_code = $1`,
      [key]
    );

    if (res.rows.length === 0) return null;

    const { long_url, expiry } = res.rows[0];

    // Expiry check
    if (expiry && new Date(expiry) < new Date()) {
      return null;
    }

    return long_url;
  }

   async exists(key) {
    const res = await pool.query(
      `SELECT 1 FROM urls WHERE short_code = $1`,
      [key]
    );

    return res.rows.length > 0;
  }

}

module.exports = PostgresStorage;