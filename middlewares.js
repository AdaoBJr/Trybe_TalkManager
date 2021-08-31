const fs = require('fs').promises;

const readFile = async (_req, res) => {
  const content = await fs.readFile('./talker.json', 'utf-8');
  if (content.length === 0) {
    return res.status(200).json([]);
  }
  const contentInJSON = JSON.parse(content);
  return res.status(200).json(contentInJSON);
};

const readFileId = async (req, res) => {
  const { id } = req.params;
  const content = await fs.readFile('./talker.json', 'utf-8');
  const contentInJSON = JSON.parse(content);
  const foundTalker = contentInJSON.find((eachTalker) => eachTalker.id === Number(id));
  if (!foundTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(foundTalker);
};

module.exports = { readFile, readFileId };
