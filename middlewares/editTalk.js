const fs = require('fs').promises;
const readFile = require('../readFile');

const editTalk = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await readFile();
  const talker = talkers.find((elem) => elem.id === Number(id));
  talker.name = name;
  talker.age = age;
  talker.talk.watchedAt = talk.watchedAt;
  talker.talk.rate = talk.rate;
  fs.writeFile('./talker.json', JSON.stringify(talkers));
  res.status(200).json(talker);
};

module.exports = editTalk;
