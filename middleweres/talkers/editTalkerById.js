const readOnFile = require('../../auxiliar_functions/talkers_data/readOnFile');
const removeIdFromList = require('../../auxiliar_functions/talkers_data/removeIdFromArray');
const writeOnFile = require('../../auxiliar_functions/talkers_data/writeOnFile');
const { OK } = require('../../http_status/status');

const talkerData = 'talker.json';

const editTalkerById = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const idNumb = Number(id);

  const talkers = await readOnFile(talkerData);
  const talker = await removeIdFromList(talkers, id);

  const editedTalker = { id: idNumb, name, age, talk };
  const editedTalkerArray = [...talker, editedTalker];

  const talkersJson = JSON.stringify(editedTalkerArray);

  await writeOnFile(talkerData, talkersJson);

  return res.status(OK).json(editedTalker);
};

module.exports = editTalkerById;
