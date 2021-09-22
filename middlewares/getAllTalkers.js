const readFile = require('../utils/readFile');

const getAllTalkers = async (_req, res) => {
  const file = await readFile('./talker.json');
  console.log(file);
  if (!file) {
    return res.status(200).send([]);
  }
  return res.status(200).json(file);
};

module.exports = getAllTalkers;
