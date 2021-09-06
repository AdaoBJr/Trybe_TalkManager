const fs = require('fs');
const { tokenRegex } = require('../services/validators');
const { validateTalker } = require('../services/validateTalker');

const path = `${__dirname}/../talker.json`;
function editTalker(req, res) {
  const { name, age, talk } = req.body;
  const { authorization } = req.headers; // 2f59b2f757f1e10a
  const validTalker = validateTalker(req.body);
  const id = +req.params.id;
  if (!authorization) return res.status(401).send({ message: 'Token não encontrado' });
  if (!tokenRegex.test(authorization)) return res.status(401).send({ message: 'Token inválido' });
  if (validTalker !== 1) return res.status(400).json({ message: validTalker.message }); 
  const db = JSON.parse(fs.readFileSync(path, 'utf8'));
  const editedTalker = { id, name, age, talk };
  const filtered = db.filter((talker) => talker.id !== id);
  filtered.push(editedTalker);
  fs.writeFileSync(path, JSON.stringify(filtered));

  return res.status(200).json(editedTalker);
}

module.exports = { editTalker };