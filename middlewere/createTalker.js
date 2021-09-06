const fs = require('fs').promises;

const arquivo = './talker.json';

const createTalker = async (req, res, _next) => {
  const { name, age, talk } = req.body;
  
  const talkers = await fs.readFile(arquivo, 'utf8')
  .then((data) => JSON.parse(data));

  const newTalker = { id: talkers.length + 1, name, age, talk };
  talkers.push(newTalker);

  await fs.writeFile(arquivo, JSON.stringify(talkers));
  
  return res.status(201).json(newTalker);
};

module.exports = createTalker;
