const fs = require('fs').promises;

const path = './talker.json';

const editTalker = async (req, res) => {
  const data = await fs.readFile(path, 'utf8');
  const talkersData = JSON.parse(data);
  const wantedId = Number(req.params.id);
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  talkersData[wantedId - 1] = {
    id: wantedId,
    name,
    age: Number(age),
    talk: {
      watchedAt,
      rate: Number(rate),
    },
  };
  fs.writeFile('talker.json', JSON.stringify(talkersData));
  return res.status(200).json(talkersData[wantedId - 1]);
};

module.exports = editTalker;
