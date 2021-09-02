const fs = require('fs').promises;

const deleteTalker = async (req, res) => {
  const path = './talker.json';
  const data = await fs.readFile(path, 'utf8');
  const talkersData = JSON.parse(data);
  const idToDelete = req.params.id;
  const talkerToDelete = talkersData.findIndex(
    ({ id }) => id === Number(idToDelete),
  );
  if (talkerToDelete === -1) return null;
  const newTalkersData = talkersData.splice(talkerToDelete, 1)[0];
  fs.writeFile('talker.json', JSON.stringify(newTalkersData));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
