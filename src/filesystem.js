const fs = require('fs');

const getFileObject = () =>
  JSON.parse(fs.readFileSync('./talker.json', { encoding: 'utf8' })) || [];

const read = (id) => getFileObject().find((item) => item.id === id);

const deleteTalker = (id) => {
  const fileObject = getFileObject();
  const index = fileObject.findIndex((item) => item.id === id);
  fileObject.splice(index, 1);
  fs.writeFileSync('./talker.json', JSON.stringify(fileObject));
};

module.exports = {
  getFileObject,
  read,
  deleteTalker,
};
