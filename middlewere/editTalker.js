const fs = require('fs').promises;

const arquivo = './talker.json';

const editTalker = async (req, res, _next) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
    
  const talkers = await fs.readFile(arquivo, 'utf8')
  .then((data) => JSON.parse(data));

  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));

  talkers[talkerIndex] = { id: Number(id), name, age, talk };
  await fs.writeFile(arquivo, JSON.stringify(talkers));
  
  return res.status(200).json(talkers[talkerIndex]);
};

module.exports = editTalker;
