const { writeFile, readFile } = require('../fsFunctions');

const HTTP_OK_STATUS = 200;

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talkersObj = await readFile();
  const newTalkersObj = talkersObj.filter((talker) => Number(talker.id) !== Number(id));
  
  await writeFile(newTalkersObj);
  return res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;