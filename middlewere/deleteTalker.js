const fs = require('fs').promises;

const arquivo = './talker.json';

const deleteTalker = async (req, res, _next) => {
  const { id } = req.params;
    
  const talkers = await fs.readFile(arquivo, 'utf8')
  .then((data) => JSON.parse(data));

  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));

  if (talkerIndex === -1) return res.status(404).json({ message: 'Talker not found!' });

  talkers.splice(talkerIndex, 1);
  await fs.writeFile(arquivo, JSON.stringify(talkers));

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;