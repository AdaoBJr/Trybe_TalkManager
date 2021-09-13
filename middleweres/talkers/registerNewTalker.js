const { CREATED } = require('../../http_status/status');

const dataLength = require('../../auxiliar_functions/talkers_data/dataLength');
const readOnFile = require('../../auxiliar_functions/talkers_data/readOnFile');
const writeOnFile = require('../../auxiliar_functions/talkers_data/writeOnFile');

const talkersData = 'talker.json';

const registerNewTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readOnFile(talkersData);

  const id = await Number(dataLength(talkersData)) + 1;

  const newTalkersArray = [...talkers, { id, name, age, talk }];
  const newTalkersJson = await JSON.stringify(newTalkersArray);

  await writeOnFile(talkersData, newTalkersJson);

  return res.status(CREATED).json(newTalkersArray);
};

module.exports = registerNewTalker;
