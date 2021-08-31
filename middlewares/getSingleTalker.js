const fs = require('fs');

const getSingleTalker = (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json'));
  const { id } = req.params;
  const talker = talkers.find((talk) => talk.id === Number(id));

  if (!talker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  res.status(200).json(talker);
};

module.exports = getSingleTalker;