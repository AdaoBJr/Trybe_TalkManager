const fs = require('fs');
const readFile = require('../utils/readFile');

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const readContent = await readFile('./talker.json');
  console.log(readContent);
  const filteredContent = readContent.filter((talker) => talker.id !== parseInt(id, 10));
  console.log(filteredContent);
  fs.writeFileSync('talker.json', JSON.stringify(filteredContent));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;