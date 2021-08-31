const {
  getAllService,
  getTalkerById,
  createTalkerData,
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

module.exports = {
  getAllTalkers,
  getTalker,
  createTalker,
};
