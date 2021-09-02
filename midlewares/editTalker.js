const fs = require('fs').promises;

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkersList = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  const talkerIndex = talkersList.findIndex((talker) => talker.id === Number(id));
  if (talkerIndex === -1) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  talkersList[talkerIndex] = { ...talkersList[talkerIndex], name, age, talk };
  await fs.writeFile('./talker.json', JSON.stringify(talkersList));

  return res.status(200).send(talkersList[talkerIndex]);
};

module.exports = editTalker;
