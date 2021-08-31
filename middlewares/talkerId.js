const rescue = require('express-rescue');
const { readFile } = require('../fsFunctions.js');

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;

const talkerId = rescue(async (req, res) => {
  const talkersObj = await readFile();
  const selectedTalker = talkersObj.find(({ id }) => id === Number(req.params.id));

  if (!selectedTalker) {
    return res.status(HTTP_NOTFOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(selectedTalker);
});

module.exports = talkerId;