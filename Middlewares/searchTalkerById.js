const fs = require('fs').promises;

const path = './talker.json';

const searchTalkerById = async (req, res) => {
  const data = await fs.readFile(path, 'utf8');
  const talkersData = JSON.parse(data);
  const wantedId = req.params.id;
  const wantedTalker = talkersData.find(({ id }) => id === parseInt(wantedId, 10));
  if (!wantedTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(wantedTalker);
};

module.exports = searchTalkerById;
