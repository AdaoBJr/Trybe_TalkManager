const fs = require('fs');

const getTalkerId = (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const findTalker = talkers.find((f) => f.id === +id);
  if (findTalker) {
    return res.status(200).json(findTalker);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = getTalkerId;
