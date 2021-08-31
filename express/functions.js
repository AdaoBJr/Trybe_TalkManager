const fs = require('fs').promises;
const crypto = require('crypto'); // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

const readFile = (fileName) => fs.readFile(fileName, 'utf-8')
.then((res) => JSON.parse(res))
.catch((err) => JSON.parse(err));

const createToken = () => crypto.randomBytes(8).toString('hex');

const checkDate = (date) => {
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  return !!regex.test(date);
};

const writeFile = (fileName, content) => fs.writeFile(fileName, JSON.stringify(content));

module.exports = {
  readFile,
  createToken,
  checkDate,
  writeFile,
};