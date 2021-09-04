const fs = require('fs').promises;
const readFile = require('../readFile');

const addNewTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readFile();
  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };
  talkers.push(newTalker);
  fs.writeFile('./talker.json', JSON.stringify(talkers));
  res.status(201).json(newTalker);
};

module.exports = addNewTalker;
