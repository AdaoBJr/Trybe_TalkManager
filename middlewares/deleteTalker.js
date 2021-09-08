const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'talker.json');

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const filterTalker = talker.filter((f) => f.id !== id);
  fs.writeFileSync(file, JSON.stringify(filterTalker));
  res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
};
module.exports = deleteTalker;

// requisito feito com ajuda de colegas