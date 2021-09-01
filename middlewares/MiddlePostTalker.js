const fs = require('fs').promises;
const { validate } = require('./Validade');
const { validateName } = require('./validadeName');
const { validateRate } = require('./validateRateAndWitch');

const verificadeRate = (rate, res) => {
   if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const post = async (req, res) => {
  const { headers: { token }, body: { name, age, talk: { watchedAt, rate } } } = req;
  validate(token, res);
  validateName(name, age, res);
  validateRate(rate, watchedAt, res);
  verificadeRate(rate, res);
  const response = await fs.readFile('./talker.json', 'utf-8');
  const convert = JSON.parse(response);
  const newPalester = {
    id: convert.length + 1,
    name,
    age,
    talk: { watchedAt, rate } };
  convert.push(newPalester);
  await fs.writeFile('./talker.json', JSON.stringify(convert));
  return res.status(201).json(newPalester);
};

module.exports = {
  post,
};
