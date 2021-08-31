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

const getRequisition = (req, res) => {
  const talker = getTalker();
  return res.status(200).send(talker);
};

const getRequisitionID = (req, res) => {
  const talker = getTalker();
  const filterID = talker.filter((talk) => talk.id === Number(req.params.id));
  
  const result = !filterID.length
    ? res.status(404).send({ message: 'Pessoa palestrante não encontrada' })
    : res.status(200).send(filterID);
  
  return result;
};
const talkerRoute = (app) => {
  app.route('/talker')
    // Pegando usuários
    .get(getRequisition);
  app.route('/talker/:id?')
    // Pegando usuários
    .get(getRequisitionID);
};

module.exports = talkerRoute;
