/**
 * Encodes a given integer into a Base62 string.
 *
 * Base62 Character Set:
 * - a-z (26 characters)
 * - A-Z (26 characters)
 * - 0-9 (10 characters)
 * Total = 62 characters
 *
 * Example:
 *   1   -> "b"
 *   61  -> "9"
 *   62  -> "ba"
 *
 * @param {number} num - Positive integer to encode
 * @returns {string} Base62 encoded string
 *
 * Notes:
 * - Used in URL shortening to generate compact, unique identifiers
 * - Ensures shorter URLs compared to base10 representation
 */
function encodeBase62(num) {
    const BASE62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    // Result string
    let str = "";

    // Edge case: handle 0 explicitly
    if (num === 0) {
        return BASE62[0];
    }

    // Convert number to Base62
    while (num > 0) {
        str = BASE62[num % 62] + str;
        num = Math.floor(num / 62);
    }

    return str;
}

module.exports = { encodeBase62 };