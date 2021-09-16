const {
  getAllTalkers,
} = require('./fsModule');

async function getTalkerById(req, res) {
  const {
    id,
  } = req.params;
  const talkers = await getAllTalkers();
  const talkerById = talkers.find((talker) => talker.id === parseInt(id, 10));

  if (talkerById) return res.status(200).json(talkerById);

  return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
}

module.exports = {
  getTalkerById,
};