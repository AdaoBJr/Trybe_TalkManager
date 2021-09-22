const readFile = require('../utils/readFile');

const searchTalker = async (req, res) => {
    const { query } = req.query;
    const talkers = await readFile('./talker.json');
    if (!query) return res.status(200).json(talkers);
    const fetchTalkers = talkers.filter(({ name }) => 
        name.toLowerCase().includes(query.toLowerCase()));
    if (fetchTalkers) return res.status(200).json(fetchTalkers);
    return res.status(200).json([]);
  };

  module.exports = searchTalker;