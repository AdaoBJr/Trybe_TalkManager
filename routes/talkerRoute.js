const fs = require('fs');
const { join } = require('path');

const filePath = join('talker.json');

const getTalkers = () => {
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
  const talkers = getTalkers();
  return res.status(200).send(talkers);
};

const getRequisitionID = (req, res) => {
  const talkers = getTalkers();
  const filterID = talkers.find((talk) => talk.id === Number(req.params.id));

  const result = !filterID
    ? res.status(404).send({ message: 'Pessoa palestrante não encontrada' })
    : res.status(200).send(filterID);

  return result;
};

const talkerRoute = (app) => {
  app.route('/talker').get(getRequisition); // Pegando usuários
  app.route('/talker/:id?').get(getRequisitionID); // Filtrando por Id de usuário
};

module.exports = talkerRoute;
