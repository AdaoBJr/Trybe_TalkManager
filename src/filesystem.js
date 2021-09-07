const fs = require('fs');

const getFileObject = () =>
  JSON.parse(fs.readFileSync('./talker.json', { encoding: 'utf8' })) || [];

const read = (id) => getFileObject().find((item) => item.id === id);

const create = (data) => {
  const fileObject = getFileObject();
  const id = Math.max(...fileObject.map((item) => item.id)) + 1;
  fileObject.push({ ...data, id });
  fs.writeFileSync('./talker.json', JSON.stringify(fileObject));
  return ({ ...data, id });
};

const modify = (data) => {
  const fileObject = getFileObject();
  const index = fileObject.findIndex((item) => item.id === data.id);
  if (index === -1) return null;
  fileObject[index] = data;
  fs.writeFileSync('./talker.json', JSON.stringify(fileObject));
  return data;
};

const deleteTalker = (id) => {
  const fileObject = getFileObject();
  const index = fileObject.findIndex((item) => item.id === id);
  fileObject.splice(index, 1);
  fs.writeFileSync('./talker.json', JSON.stringify(fileObject));
};

module.exports = {
  getFileObject,
  read,
  modify,
  deleteTalker,
  create,
};
