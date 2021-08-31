const fs = require('fs').promises;
const { validateName, validate, validateRate } = require('./Validade');

const putFunction = async (req, res) => {
  const { params: { id }, headers: { token },
  body: { name, age, talk: { watchedAt, rate } } } = req;
  validate(token, res);
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
