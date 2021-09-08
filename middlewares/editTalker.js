const fs = require('fs').promises;

const editTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const data = await fs
    .readFile('talker.json', 'utf8')
    .then((file) => JSON.parse(file));
  const editedTalker = data.map((talker) =>
    (talker.id === +id ? { name, age, id: +id, talk } : talker));
  await fs.writeFile('./talker.json', JSON.stringify(editedTalker));
  return res.status(200).json({ name, age, id: +id, talk });
};

module.exports = editTalker;
