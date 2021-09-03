const fs = require('fs');

const getTalkerById = async (req, res) => {
  const talkers = await JSON.parse(fs.readFileSync('talker.json'));
  const { id } = req.params;
  const talker = talkers.find((talk) => talk.id === Number(id));
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talker);
};

module.exports = getTalkerById;
