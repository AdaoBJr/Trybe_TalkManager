const { writeFileTalker, readFile } = require('../fs-utils');

const HTTP_OK_STATUS = 201;

const addTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkersList = await readFile();
  const countTalker = talkersList.length;
  const newTalker = {
    id: countTalker + 1,
    name,
    age,
    talk,
  };
  talkersList.push(newTalker);
  await writeFileTalker(talkersList);
  return res.status(HTTP_OK_STATUS).json(newTalker);
};

module.exports = addTalker;
