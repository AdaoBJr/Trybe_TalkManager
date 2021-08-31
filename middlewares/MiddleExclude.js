const fs = require('fs').promises;

const exclude = async (req, res) => {
  const { id } = req.params;

  const response = await fs.readFile('./talker.json', 'utf-8');
  const convert = JSON.parse(response);
  const newList = convert.filter((talker) => talker.id !== Number(id));
  await fs.writeFile('talker.json', JSON.stringify(newList));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = {
  exclude,
};
