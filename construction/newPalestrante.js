const {
  autenticaToken,
  validaNome,
  validaAge,
  validaTalk,
  validaRate,
  validaDate,
  addTalker,
} = require('./addPalestrante');

async function newPalestrante(req, res, next) {
  autenticaToken(req, res, next);
  console.log('1');
  validaNome(req, res, next);
  validaAge(req, res, next);
  validaTalk(req, res, next);
  validaRate(req, res, next);
  validaDate(req, res, next);
  const aux = await addTalker(req, res);
  console.log(aux);
  return res.status(201).json({ aux });
}

module.exports = newPalestrante;
