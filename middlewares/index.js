const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
const readTalkers = () => fs.readFile('./talker.json', 'utf8');

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const data = await readTalkers()
  .then((talkers) => JSON.parse(talkers))
  .then((talkers) => {
      const talker = talkers.find((talkerID) => talkerID.id === +id);
      return talker;
    });
    if (!data) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).send(data);
};

const getTalkers = (_req, res) => {
  readTalkers().then((talkers) => res.status(HTTP_OK_STATUS).send(JSON.parse(talkers)))
  .catch((err) => res.status(401)
  .json({ message: `Error ${err}` }));

  if (!readTalkers) {
    return res.status(HTTP_OK_STATUS).JSON.parse([]);
  }
};

module.exports = {
  getTalkers,
  getTalkerById,
};