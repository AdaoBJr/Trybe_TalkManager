const fs = require('fs').promises;

const file = 'talker.json';
const OK_STATUS = 200;
const NOT_FOUND = 404;

const getTalkers = async () => {
  const data = await fs.readFile(file, 'utf-8');
  const talkers = await JSON.parse(data);

  return talkers;
};

const getTalkersById = async (req, res) => {
  const talkers = await getTalkers();
  const { id } = await req.params;

  const talker = talkers.find((curr) => curr.id === Number(id));

  if (!talker) {
    return res.status(NOT_FOUND).json(
      { message: 'Pessoa palestrante não encontrada' },
    );
  }

  return res.status(OK_STATUS).json(talker);
};

const getAllTalkers = async (_req, res) => {
  const talkers = await getTalkers();

  if (!talkers) {
    return res.status(OK_STATUS).send([]);
  }

  return res.status(OK_STATUS).json(talkers);
};

module.exports = {
  getTalkersById,
  getAllTalkers,
};
