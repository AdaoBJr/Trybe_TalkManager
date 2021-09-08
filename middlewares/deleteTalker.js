const fs = require('fs').promises;

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talker = JSON.parse(await fs.readFile('talker.json', 'utf-8'));
  const findTalker = talker.findIndex((f) => f.id === Number(id));
  if (findTalker === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  talker.splice(findTalker, 1);
  await fs.writeFileSync('talker.json', JSON.stringify(talker));
  return res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
};
module.exports = deleteTalker;

// requisito feito com ajuda de colegas