const fs = require('fs');
const { join } = require('path');

const filePath = join('talker.json');

const getTalker = () => {
  const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : [];
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveTalker = (talker) => {
  fs.writeFileSync(filePath, JSON.stringify(talker, null, '\t'));
};

const getRequisition = (req, res) => {
  const talker = getTalker();
  return res.status(200).send(talker);
};

const getRequisitionID = (req, res) => {
  const talker = getTalker();
  const filterID = talker.find((talk) => talk.id === Number(req.params.id));

  const result = !filterID
    ? res.status(404).send({ message: 'Pessoa palestrante não encontrada' })
    : res.status(200).send(filterID);

  return result;
};

const postRequisition = (req, res) => {
  const talker = getTalker();
  talker.push(req.body);
  saveTalker(talker);
  return res.status(201).send('OK! Usuário Criado');
};

const talkerRoute = (app) => {
  app.route('/talker')
    // Pegando usuários
    .get(getRequisition);
  app.route('/talker/:id?')
    // Filtrando por Id de usuário
    .get(getRequisitionID);
  app.route('/login')
    // Filtrando por Id de usuário
    .post(postRequisition);
};

module.exports = talkerRoute;
