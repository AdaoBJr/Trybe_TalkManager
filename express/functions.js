const fs = require('fs/promises');
const crypto = require('crypto'); // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

const readFile = (fileName) => fs.readFile(fileName, 'utf-8')
.then((res) => JSON.parse(res))
.catch((err) => JSON.parse(err));

const createToken = () => crypto.randomBytes(8).toString('hex');

module.exports = {
  readFile,
  createToken,
};