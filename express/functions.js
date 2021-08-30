const fs = require('fs/promises');

const readFile = (fileName) => fs.readFile(fileName, 'utf-8')
.then((res) => JSON.parse(res))
.catch((err) => JSON.parse(err));

module.exports = {
  readFile,
};