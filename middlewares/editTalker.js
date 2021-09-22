const fs = require('fs');
const readFile = require('../utils/readFile');

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const readContent = await readFile('./talker.json');
  const filteredContent = readContent.filter((talker) => talker.id !== id);
  const newTalker = {
    id: Number(id),
    name,
    age,
    talk: { ...talk },
  };
  filteredContent.push(newTalker);
  fs.writeFileSync('talker.json', JSON.stringify(filteredContent));
  res.status(200).json(newTalker);
};

module.exports = editTalker;