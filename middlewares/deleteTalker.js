const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'talker.json');

const deleteTalker = (req, res, _next) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync('talker.json'));
  const talker = talkers.filter((talk) => talk.id !== Number(id));
  fs.writeFileSync(filePath, JSON.stringify(talker));
  res.status(200).json({
    message: 'Pessoa palestrante deletada com sucesso',
  });
};

module.exports = deleteTalker;