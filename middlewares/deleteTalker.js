const fs = require('fs').promises;

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const data = await fs
    .readFile('talker.json', 'utf8')
    .then((file) => JSON.parse(file));
  const deletedTalker = data.filter((talker) => talker.id !== +id);
  await fs.writeFile('./talker.json', JSON.stringify(deletedTalker));
  return res
    .status(200)
    .json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
