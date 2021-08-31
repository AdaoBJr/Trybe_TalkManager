const { writeFileTalker, readFile } = require('../fs-utils');

const HTTP_OK_STATUS = 200;

const deleteTalker = async (req, res) => {
  const { id: idDelete } = req.params;
  const talkersList = await readFile();
  const newTalkerList = talkersList
  .filter(({ id }) => Number(id) !== Number(idDelete));
  await writeFileTalker(newTalkerList);
  return res
    .status(HTTP_OK_STATUS)
    .json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
