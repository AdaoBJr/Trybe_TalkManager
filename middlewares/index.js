const { readFile } = require('../ultils/index');

const findAll = async (req, res) => {
  const talk = await readFile();

  return res.status(200).json(talk);
};

module.exports = {
  findAll,
};
