const { writeFile, readFile } = require('../fsFunctions');

const HTTP_OK_STATUS = 200;

const editTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const talkersObj = await readFile();
  const newTalker = {
    id: Number(id),
    name,
    age,
    talk,
  };
  talkersObj.filter((talker) => Number(talker.id) !== Number(id));
  talkersObj.push(newTalker);
  
  await writeFile(talkersObj);
  return res.status(HTTP_OK_STATUS).json(newTalker);
};

module.exports = editTalker;