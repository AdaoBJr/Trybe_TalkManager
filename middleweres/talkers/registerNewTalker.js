const { CREATED, BAD_REQUEST } = require('../../http_status/status');
const appendFile = require('../../auxiliar_functions/talkers_data/appendFile');
const idGenerator = require('../../auxiliar_functions/generators/idGenerator');

const talkersData = 'talker.json';

const registerNewTalker = async (req, res) => {
  const { name, age, talk } = req.body;

  const id = idGenerator(talkersData);

  const newTalkerObj = { id, name, age, talk };

  const response = await appendFile(talkersData, newTalkerObj);

  if (!response) return res.status(BAD_REQUEST).json({ id });

  return res.status(CREATED).send({ id: Number(id), name, age, talk });
};

module.exports = registerNewTalker;
