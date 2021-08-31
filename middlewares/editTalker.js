const { writeFileTalker, readFile } = require('../fs-utils');

const HTTP_OK_STATUS = 200;

const editTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id: idEdit } = req.params;
  const talkerChanged = {
    idEdit,
    name,
    age,
    talk,
  };
  const talkersList = await readFile();
  const newTalkerList = talkersList
    .filter(({ id }) => Number(idEdit) !== id)
    .push(talkerChanged);

  await writeFileTalker(newTalkerList);

  return res.status(HTTP_OK_STATUS).json(talkerChanged);
};

module.exports = editTalker;
