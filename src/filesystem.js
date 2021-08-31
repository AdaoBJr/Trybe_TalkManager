const fs = require('fs');

const getFileObject = () =>
  JSON.parse(fs.readFileSync('./talker.json', { encoding: 'utf8' })) || [];

const read = (id) => getFileObject().find((item) => item.id === id);

module.exports = {
  getFileObject,
  read,
};
