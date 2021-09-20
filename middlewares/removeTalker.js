const fs = require('fs').promises;
const rescue = require('express-rescue');

const pathArquivo = './talker.json';

const getTalkers = (url) => fs.readFile(url, 'utf8')
    .then((data) => ({ data: JSON.parse(data), len: JSON.parse(data).length }))
    .catch((err) => {
      console.log(err);
    });

module.exports = rescue(async (req, res, _next) => {
  const { id } = req.params;

  let talkers = await getTalkers(pathArquivo);
  talkers = talkers.data.filter((talker) => talker.id !== JSON.parse(id));
  await fs.writeFile(pathArquivo, JSON.stringify(talkers));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});
