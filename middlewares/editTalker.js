const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'talker.json');

const editTalker = (req, res, _next) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync('talker.json'));
  const talker = talkers.find((talk) => talk.id === Number(id));
  talker.name = req.body.name;
  talker.age = req.body.age;
  talker.talk.watchedAt = req.body.talk.watchedAt;
  talker.talk.rate = +req.body.talk.rate;
  fs.writeFileSync(filePath, JSON.stringify(talkers));
  res.status(200).json(talker);
};

module.exports = editTalker; 