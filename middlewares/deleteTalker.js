const fs = require('fs').promises;
const readFile = require('../readFile');

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const talkersFilter = talkers.filter((elem) => elem.id !== Number(id));
  fs.writeFile('./talker.json', JSON.stringify(talkersFilter));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
