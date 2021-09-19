// 2 - Crie o endpoint GET /talker/:id
const fs = require('fs').promises;

const pathId = './talker.json';

module.exports = (req, res, _next) => {
  const { id } = req.params;
  fs.readFile(pathId, 'utf8')
    .then((data) => {
      const parsed = JSON.parse(data);
      const found = parsed.find((talker) => JSON.stringify(talker.id) === id);

      if (!found) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }
        return res.status(200).json(found);
    })
    .catch((err) => {
      console.error(`Não foi possível ler o arquivo ${pathId}\n Erro: ${err}`);
      // process.exit(1);
    });
};
