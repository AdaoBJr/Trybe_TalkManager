const fs = require('fs');
const { verificaToken } = require('./verificações');

const searchTalker = (req, res) => {
  const { authorization } = req.headers;
  const { q } = req.query;

  const validToken = verificaToken(authorization);
  if (validToken !== '') return res.status(validToken.status).json({ message: validToken.message });

  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf8'));

  if (!q) {
    return res.status(200).json(talkers);
  }

  const filteredTalkers = talkers.filter(({ name }) => name.includes(q));
  return (
    filteredTalkers
      ? res.status(200).json(filteredTalkers)
      : res.status(404).json([])
  );
};

module.exports = searchTalker; 

// método feito atraves de consulta a pr de colegas