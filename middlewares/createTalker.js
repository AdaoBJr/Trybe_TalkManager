const fs = require('fs');
const { tokenRegex } = require('../services/validators');
const { validateTalker } = require('../services/validateTalker');

/* 
  Me baseei em uma estrutura parecida da colega ANA LUIZA MACHADO da Turma 9
  https://github.com/tryber/sd-09-project-talker-manager/blob/7e628969d65e2a0235c8dcfbce415cdfb8c428d6/middlewares/addTalker.js
*/

function createTalker(req, res) {
  const { name, age, talk } = req.body;
  const { authorization } = req.headers; // 2f59b2f757f1e10a
  const validTalker = validateTalker(req.body);
  if (!authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  } if (!tokenRegex.test(authorization)) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  if (validTalker !== 1) {
    return res.status(400).json({ message: validTalker.message });    
  } 
  const path = `${__dirname}/../talker.json`;
  const db = JSON.parse(fs.readFileSync(path, 'utf8'));
  const newTalker = { id: db.length + 1, name, age, talk };
  db.push(newTalker);
  fs.writeFileSync(path, JSON.stringify(db));

  return res.status(201).json(newTalker);
}

module.exports = { createTalker };