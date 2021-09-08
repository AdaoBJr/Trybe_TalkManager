const fs = require('fs').promises;

const talkersData = 'talker.json';

const STATUS_CREATED = 201;

const addTalker = async (req, res) => {
  const { name, age, talk } = req.body;

  const data = await fs.readFile(talkersData, 'utf8');
  const result = JSON.parse(data);
  const newTalker = {
    name,
    age,
    id: result.length + 1,
    talk,
  };

  result.push(newTalker);
  await fs.writeFile(talkersData, JSON.stringify(result));

  return res.status(STATUS_CREATED).json(newTalker);
};

module.exports = addTalker;
