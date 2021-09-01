const { writeFile, readFile } = require('../fsFunctions');

const HTTP_OK_STATUS = 201;

const addTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkersObj = await readFile();
  const talkersQuant = talkersObj.length;
  const newTalker = {
    id: talkersQuant + 1,
    name,
    age,
    talk,
  };
  talkersObj.push(newTalker);
  await writeFile(talkersObj);
  return res.status(HTTP_OK_STATUS).json(newTalker);
};

module.exports = addTalker;