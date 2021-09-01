const fs = require('fs').promises;
const { validate } = require('./Validade');
const { validateName } = require('./validadeName');
const { validateRate } = require('./validateRateAndWitch');

const putFunction = async (req, res) => {
  const { params: { id }, headers: { authorization },
  body: { name, age, talk: { watchedAt, rate } } } = req;
  validate(authorization, res);
  validateName(name, age, res);
  validateRate(rate, watchedAt, res);
  const response = await fs.readFile('./talker.json', 'utf-8');
  const convert = JSON.parse(response);
  const newPalester = {
    id: +id,
    name,
    age,
    talk: { watchedAt, rate } };
  const put = convert.filter((cur) => cur.id !== Number(id));
  put.push(newPalester);
  await fs.writeFile('./talker.json', JSON.stringify(put));
  
  return res.status(200).json(newPalester);
};

module.exports = {
  putFunction,
};
