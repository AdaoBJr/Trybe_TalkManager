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
  const { name, age, talk } = req.body;

  let talkers = await getTalkers(pathArquivo);
  const talkerMod = { name, age, id: +id, talk };
  talkers = talkers.data.map((talker) => {
    if (talker.id === JSON.parse(id)) {
      return talkerMod;
    }
    return talker;
  });
  await fs.writeFile(pathArquivo, JSON.stringify(talkers));
  return res.status(200).json(talkerMod);
});
