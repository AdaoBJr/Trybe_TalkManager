const { readFile } = require('./functions');

const TALKER_JSON = './talker.json';

const getAllTalker = async (req, res) => {
  const result = await readFile(TALKER_JSON);
    if (!result) return res.status(200).json(Array.from([]));
    return res.status(200).json(result);
};

const getTalker = async (req, res) => {
  const talkers = await readFile(TALKER_JSON);
  const { id } = req.params;
  const result = talkers.find((talker) => Number(talker.id) === Number(id));
  if (!result) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(result);
};

module.exports = { getAllTalker, getTalker };