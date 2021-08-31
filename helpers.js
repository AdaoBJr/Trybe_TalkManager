const fs = require('fs').promises;
const crypto = require('crypto-js');

function getTalkers() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
}

function regexEmail(email) {
  const valid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return valid.test(String(email).toLowerCase());
}

// https://stackoverflow.com/questions/48524452/base64-encoder-via-crypto-js
function generateToken(myString) {
  const encodedWord = crypto.enc.Utf8.parse(myString); // encodedWord Array object
  const encoded = crypto.enc.Base64.stringify(encodedWord); // string: 'NzUzMjI1NDE='
  return encoded;
}

console.log(generateToken(Math.random().toFixed(8)));

module.exports = { getTalkers, generateToken, regexEmail };
