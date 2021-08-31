const fs = require('fs').promises;

const readTalkerJson = () => fs.readFile('./talker.json', 'utf-8')
  .then((fileContent) => JSON.parse(fileContent));

module.exports = {
  readTalkerJson,
};
