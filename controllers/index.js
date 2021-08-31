const utils = require('../utils');

const getAllTalkers = async (req, res) => {
  const fileContent = await utils.readFile('./talker.json');
  return res.status(200).json(fileContent);
};

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const talkers = await utils.readFile('./talker.json');
  const talker = talkers.find((el) => el.id === Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
};

const createTalker = async (req, res) => {
  const { name, age, talk: watchedAt, rate } = req.body;
  const talkers = await utils.readFile('./talker.json');
  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk: {
      watchedAt, rate,
    },
  };
  talkers.push(newTalker);
  await utils.writeFile('./talker.json', JSON.stringify(talkers));
  return res.status(201).json(newTalker);
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  createTalker,
};
