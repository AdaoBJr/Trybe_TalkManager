const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const getTalker = (req, res) => {
  const readTalkers = fs.readFile('./talker.json', 'utf8');
  readTalkers.then((talkers) => res.status(HTTP_OK_STATUS).send(JSON.parse(talkers)))
  .catch((err) => res.status(401)
  .json({ message: `Error ${err}` }));

  if (!readTalkers) {
    return res.status(HTTP_OK_STATUS).JSON.parse([]);
  }
};

module.exports = {
  getTalker,
};