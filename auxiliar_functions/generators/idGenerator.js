const readFile = require('../talkers_data/readFile');

const idGenerator = async (data) => {
  const file = await readFile(data);
  const fileJson = await JSON.parse(file);
  const id = await fileJson.length + 1;

  return id;
};

module.exports = idGenerator;
