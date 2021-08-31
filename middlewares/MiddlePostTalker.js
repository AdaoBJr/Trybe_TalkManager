const fs = require('fs').promises;
const { validate } = require('./Validade');
const { validateName } = require('./validadeName');
const { validateRate } = require('./validateRateAndWitch');

const post = async (req, res) => {
  const { headers: { token }, body: { name, age, talk: { watchedAt, rate } } } = req;
  console.log(watchedAt);
  validate(token, res);
  validateName(name, age, res);
  validateRate(rate, watchedAt, res);
  const response = await fs.readFile('./talker.json', 'utf-8');
  const convert = JSON.parse(response);

  const newPalester = {
    id: convert.length + 1,
    name,
    age,
    talk: { watchedAt, rate },
  };
  convert.push(newPalester);
  await fs.writeFile('./talker.json', JSON.stringify(convert));

  return res.status(200).json(newPalester);
};

module.exports = {
  post,
};
