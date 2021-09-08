const fs = require('fs');

const deleteTalker = (req, res) => {
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const findTalker = talker.findIndex((f) => f.id === id);
  if (findTalker === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  talker.splice(findTalker, 1);
  fs.writeFileSync('talker.json', JSON.stringify(talker));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};
module.exports = deleteTalker;

// requisito feito com ajuda de colegas