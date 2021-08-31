const { writeFileTalker, readFile } = require('../fs-utils');

const HTTP_OK_STATUS = 200;

const editTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const talkerChanged = {
    id,
    name,
    age,
    talk,
  };
  const talkersList = await readFile();
  const newTalkerList = talkersList.filter(
    (element) => element.id !== Number(id)
  );
  newTalkerList.push(talkerChanged);
  await writeFileTalker(newTalkerList);
  return res.status(HTTP_OK_STATUS).json(talkerChanged);
};

module.exports = editTalker;
