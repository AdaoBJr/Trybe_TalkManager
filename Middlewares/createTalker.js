const fs = require('fs').promises;

const createTalker = async (req, res) => {
  const path = './talker.json';
  const data = await fs.readFile(path, 'utf8');
  const talkersData = JSON.parse(data);
  const newTalker = req.body;
  newTalker.id = talkersData.length + 1;
  talkersData.push(newTalker);
  fs.writeFile('./talker.json', JSON.stringify(talkersData));
  res.status(201).json(newTalker);
};

module.exports = createTalker;
