const crypto = require('crypto');

const generateToken = () => crypto.randomBytes(8).toString('hex');

module.exports = generateToken;

/**
 * Source
 * https://www.tabnine.com/code/javascript/functions/crypto/randomBytes
 * https://stackoverflow.com/questions/55104802/nodejs-crypto-randombytes-to-string-hex-doubling-size
 * https://stackoverflow.com/questions/60107757/why-do-we-do-tostringhex-after-crypto
 */
