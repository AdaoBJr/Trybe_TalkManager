const fs = require('fs');
const { tokenRegex } = require('../services/validators');

const path = `${__dirname}/../talker.json`;
function deleteTalker(req, res) {
  const { authorization } = req.headers; // 2f59b2f757f1e10a
  const id = +req.params.id;
  if (!authorization) return res.status(401).send({ message: 'Token não encontrado' });
  if (!tokenRegex.test(authorization)) return res.status(401).send({ message: 'Token inválido' });

  const db = JSON.parse(fs.readFileSync(path, 'utf8'));
  const filtered = db.filter((talker) => talker.id !== id);
  fs.writeFileSync(path, JSON.stringify(filtered));

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
}

module.exports = { deleteTalker };