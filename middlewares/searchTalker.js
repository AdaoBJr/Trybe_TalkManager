const readFile = require('../readFile');

const searchTalker = async (req, res) => {
  const query = req.query.q;
  const talkers = await readFile();
  if (!query) {
    return res.status(200).json(talkers);
  }
  const talkerFiltered = talkers.filter((talk) => talk.name.includes(query));
  res.status(200).json(talkerFiltered);
};

module.exports = searchTalker; 