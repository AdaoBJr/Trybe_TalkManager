const {
  getAllService,
  getTalkerById,
  createTalkerData,
  updateTalkerData,
  deleteTalkerData,
  searchTalkerData,
} = require('../services/talkerServices');

const getAllTalkers = async (req, res) => {
  const speakers = await getAllService();
  if (!speakers.length) {
    return res.status(200).json([]);
  }
  return res.status(200).json(speakers);
};

const getTalker = async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);
  if (!talker) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talker);
};

const createTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const speake = await createTalkerData(name, age, talk);
  return res.status(201).json(speake);
};

const updateTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const speakers = await updateTalkerData(name, age, talk, id);
  return res.status(200).json(speakers);
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  await deleteTalkerData(id);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

const searchTalker = async (req, res) => {
  const { q } = req.query;
  const response = await searchTalkerData(q);
  return res.status(200).json(response);
};

module.exports = {
  getAllTalkers,
  getTalker,
  createTalker,
  updateTalker,
  deleteTalker,
  searchTalker,
};
