const fs = require('fs').promises;

const talkersData = 'talker.json';
const HTTP_OK_STATUS = 200;
const PAGE_NOT_FOUND = 404;

const getTalkerId = (req, res) => {
  const { id } = req.params;

  fs.readFile(talkersData, 'utf8')
  .then((dataTalker) => JSON.parse(dataTalker))
  .then((talkers) => talkers.find((talker) => talker.id === Number(id)))
  .then((talker) => {
    if (!talker) {
      return res.status(PAGE_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(HTTP_OK_STATUS).json(talker);
  });
};

module.exports = getTalkerId;
