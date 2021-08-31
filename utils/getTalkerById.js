const fs = require('fs').promises;

async function getTalkerById(req, res) {
  const { id } = req.params;
  const data = JSON.parse(await fs.readFile('talker.json', 'utf-8'));
  const getTalker = data.find((talker) => talker.id === Number(id));
  if (!getTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } return res.status(200).json(getTalker);
}

module.exports = getTalkerById;
