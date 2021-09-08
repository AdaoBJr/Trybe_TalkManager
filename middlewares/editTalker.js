const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'talker.json');

const editTalker = (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talker = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const findTalker = talker.find((f) => f.id === id);
  findTalker.name = name;
  findTalker.age = age;
  findTalker.talk.watchedAt = talk.watchedAt;
  findTalker.talk.rate = talk.rate;
  fs.writeFileSync(file, JSON.stringify(talker));
  res.status(200).json(findTalker);
};
module.exports = editTalker;
