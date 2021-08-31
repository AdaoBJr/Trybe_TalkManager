const fs = require('fs').promises;

const deleteTalker = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  const id = Number(req.params.id);
  const data = JSON.parse(await fs.readFile('talker.json', 'utf8'));
  const getTalkers = data.filter((talker) => talker.id !== id);
  await fs.writeFile('talker.json', JSON.stringify(getTalkers));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
