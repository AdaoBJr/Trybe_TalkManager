const fs = require('fs').promises;
const rescue = require('express-rescue');

const pathArquivo = './talker.json';

const getTalkers = (url) => fs.readFile(url, 'utf8')
    .then((data) => ({ data: JSON.parse(data), len: JSON.parse(data).length }))
    .catch((err) => {
      console.log(err);
    });

module.exports = rescue(async (req, res, _next) => {
  const { q } = req.query;

  const talkers = await getTalkers(pathArquivo);
  const filteredTalkers = talkers.data
    .filter((talker) => talker.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);

  if (filteredTalkers.length === 0) {
    await fs.writeFile(pathArquivo, JSON.stringify(talkers.data));
    return res.status(200).json(talkers.data);
  }
  await fs.writeFile(pathArquivo, JSON.stringify(filteredTalkers));
  return res.status(200).json(filteredTalkers);
});
