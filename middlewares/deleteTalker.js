const fs = require('fs');

const deleteTalker = (req, res) => {
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const filterTalker = talker.filter((f) => f.id !== id);
  fs.writeFileSync('talker.json', JSON.stringify(filterTalker));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};
module.exports = deleteTalker;
