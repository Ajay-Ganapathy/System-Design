/**
 * Validates custom alias
 * Rules:
 * - Only alphanumeric + dash
 * - Length between 3 and 20
 */

function isValidAlias(alias){
    const regex = /^[a-zA-Z0-9-]{3,20}$/;
    return regex.test(alias);
}

module.exports = {isValidAlias};