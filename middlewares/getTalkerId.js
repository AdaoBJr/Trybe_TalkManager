const talkerId = require('../services/talkerId');

async function getTalkerId(req, res) {
  const { id } = req.params;
  const result = await talkerId(id);
  if (result) {
    return res.status(200).json(result);
  }

  return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
}

module.exports = { getTalkerId };