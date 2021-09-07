const fs = require('fs');

const talker = (_req, res) => {
  try {
    const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

    res.status(200).json(talkers);
  } catch (err) {
    res.status(404).json({ Erro: err.message });
  }
};

module.exports = talker;