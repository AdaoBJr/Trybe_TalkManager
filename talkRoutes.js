const express = require('express');
const fs = require('fs').promises;

const {
  validateToken,
  validateName,
  validateAge,
  validateRate,
  validateDate,
} = require('./middleware');

const app = express();

const getTalkers = () => fs.readFile('./talker.json', 'utf-8')
  .then((res) => JSON.parse(res));

const router = express.Router();

app.use(validateToken, validateName, validateAge, validateRate, validateDate);

router.post('/talker', async (req, res) => {
  const talkerList = await getTalkers();
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const newTalker = [{
    name,
    age,
    talk: { watchedAt, rate },
  }];

  talkerList.push(newTalker);
  await fs.writeFile('./talker.json', talkerList, 'utf8');

  res.status(200).json({ message: 'cheguei' });
});

module.exports = router;