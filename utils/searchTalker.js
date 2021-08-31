const fs = require('fs').promises;

async function searchTalker(req, res) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  const { q } = req.query;
  const data = JSON.parse(await fs.readFile('talker.json', 'utf-8'));
  if (!q) return res.status(200).json(data);
  const talker = data.filter(({ name }) => name.toLowerCase().includes(q.toLowerCase()));
  if (talker) return res.status(200).json(talker);
  return res.status(200).json([]);
}

module.exports = searchTalker;
