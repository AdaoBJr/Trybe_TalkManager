const utils = require('../utils');

const talkersJson = './talker.json';

const getAllTalkers = async (req, res) => {
  const fileContent = await utils.readFile(talkersJson);
  return res.status(200).json(fileContent);
};

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const talkers = await utils.readFile(talkersJson);
  const talker = talkers.find((el) => el.id === Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
};

const createTalker = async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = await utils.readFile(talkersJson);
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

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await utils.readFile(talkersJson);
  const editedTalker = {
    id: Number(id),
    name,
    age,
    talk: { ...talk },
  };
  const filteredTalkers = talkers.filter((talker) => talker.id !== Number(id));
  filteredTalkers.push(editedTalker);
  await utils.writeFile(talkersJson, JSON.stringify(filteredTalkers));
  return res.status(200).json(editedTalker);
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await utils.readFile(talkersJson)
    .then((content) => content
      .filter((talker) => talker.id !== Number(id)));
  await utils.writeFile(talkersJson, JSON.stringify(talkers));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};  

const searchTalker = async (req, res) => {
  const { q } = req.query;
  const talkers = await utils.readFile(talkersJson);
  if (!q || q === '') {
    return res.status(200).json(talkers);
  }
  const filteredTalkers = talkers
    .filter((talker) => talker
      .name.toLowerCase().includes(q.toLowerCase()));
  return res.status(200).json(filteredTalkers);
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  createTalker,
  editTalker,
  deleteTalker,
  searchTalker,
};
