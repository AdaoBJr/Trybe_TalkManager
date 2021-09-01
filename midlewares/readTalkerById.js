const fs = require('fs').promises;

const readTalkerById = (req, res) => {
  const { id } = req.params;
  return fs.readFile('./talker.json', 'utf-8')
    .then((content) => JSON.parse(content))
    .then((content) => {
      const talkerIndex = content.findIndex((talker) => talker.id === Number(id));
      if (talkerIndex === -1) {
        return res.status(404).json({
          message: 'Pessoa palestrante não encontrada',
        });
      }
      return res.status(200).send(content[talkerIndex]);
  })
    .catch((err) => res.status(401)
    .json({ message: err.message }));
};

module.exports = readTalkerById;
