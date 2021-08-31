const fs = require('fs').promises;

const arquivos = './talker.json';

const getTalkerById = (req, res, _next) => {
  const { id } = req.params;
  fs.readFile(arquivos, 'utf8')
    .then((data) => JSON.parse(data))
    .then((data) => {
      const arquivo = data.find((r) => r.id === parseInt(id, 10));
      if (!arquivo) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      return res.status(200).send(arquivo);
  });
};

module.exports = getTalkerById;
