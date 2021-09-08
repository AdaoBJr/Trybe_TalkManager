const fs = require('fs').promises;

const talkerData = './talker.json';
const HTTP_STATUS_OK = 200;

const deleteTalker = async (req, res, _next) => {
  const { id } = req.params;
  const dataTalker = await fs.readFile(talkerData, 'utf-8');
  const result = JSON.parse(dataTalker);
  const speakerId = result.filter((speaker) => speaker.id !== Number(id))[0];

  await fs.writeFile(talkerData, JSON.stringify(speakerId));
  return res.status(HTTP_STATUS_OK).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
