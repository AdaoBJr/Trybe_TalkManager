const fs = require('fs');

const getId = (req, res) => {
    const { id } = req.params;
    const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
    const talkerId = talkers.find((talker) => talker.id === Number(id));

    if (talkerId) {
      return res.status(200).json(talkerId);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = getId;
