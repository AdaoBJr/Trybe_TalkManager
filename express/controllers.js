const { readFile } = require('./functions');

const TALKER_JSON = './talker.json';

const getAllTalker = async (req, res) => {
  const result = await readFile(TALKER_JSON);
    if (!result) return res.status(200).json(Array.from([]));
    return res.status(200).json(result);
};

module.exports = { getAllTalker };