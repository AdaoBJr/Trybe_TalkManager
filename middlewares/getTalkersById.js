const fs = require('fs').promises;

const pathArquivo = './talker.json';

module.exports = (req, res, _next) => {
  const { id } = req.params;
  fs.readFile(pathArquivo, 'utf8')
    .then((data) => {
      const dataParsed = JSON.parse(data);
      const talkerFound = dataParsed.find((talker) => JSON.stringify(talker.id) === id);

      if (!talkerFound) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }
      return res.status(200).json(talkerFound);
    })
    .catch((err) => {
      console.error(`Não foi possível ler o arquivo ${pathArquivo}\n Erro: ${err}`);
      process.exit(1);
    });
};
