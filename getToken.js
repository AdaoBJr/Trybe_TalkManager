const CryptoJS = require('crypto-js');

function getToken() {
  const salt = CryptoJS.lib.WordArray.random(8);
  return salt.toString();
}
// console.log(getToken());

module.exports = { getToken }; 