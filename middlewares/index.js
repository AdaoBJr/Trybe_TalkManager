const { readFile } = require('../utils/index');

const findAll = async (req, res) => {
  const talk = await readFile();

  return res.status(200).json(talk);
};

const findOne = async (req, res) => {
  const { id } = req.params;
  
  const talk = await readFile();
  const findTalker = talk.find((talker) => talker.id === +id);

  if (findTalker) {
    return res.status(200).json(findTalker);
  }

  return res.status(404).json({ message: 'Pessoa palestrante não econtrada' });
};

module.exports = {
  findAll,
  findOne,
};
