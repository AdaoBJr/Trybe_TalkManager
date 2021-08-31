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

const talkerRoute = (app) => {
  app.route('/talker')
    // Pegando usuários
    .get(getRequisition);
};

module.exports = talkerRoute;
