const fs = require('fs').promises;

const talkersData = 'talker.json';

const HTTP_OK_STATUS = 200;

const editTalker = async (req, res, _next) => {
  const { id } = req.params;
  const talkers = await fs.readFile(talkersData, 'utf8');
  const result = JSON.parse(talkers);
  const editSpeaker = result.filter((speaker) => speaker.id !== Number(id));

  const { name, age, talk } = req.body;
  const objectTalker = {
    name,
    age,
    id: Number(id),
    talk,
  };

  editSpeaker.push(objectTalker);
  await fs.writeFile(talkersData, JSON.stringify(editSpeaker));

  return res.status(HTTP_OK_STATUS).json(objectTalker);
};

module.exports = editTalker;
