const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
const fs = require('fs').promises;
const crypto = require('crypto');

const {
    isValidEmail,
    isValidPassword,
  } = require('./middleware');

  const HTTP_OK_STATUS = 200;

const talkerCaller = async () => {
    const data = await fs.readFile('./talker.json', 'utf-8');
    return JSON.parse(data);
};

router.post(
    'login',
    isValidEmail,
    isValidPassword,
    (_req, res) => { 
    const tok = crypto.randomBytes(8).toString('hex');
    console.log(tok);
    res.status(200).json({ token: tok });
    },
);
router.put('talker/:id', async (req, res) => {
    const { id } = req.params;
    // const { name, age, talk: { watchedAt }, talk: { rate } } = req.body;
    const data = await talkerCaller();
    console.log(data);
    const result = data.find((dat) => dat.id === Number(id));
    console.log(result);
    res.status(200).json({ result });
});

router.get('/talker', async (req, res) => {
    const data = await talkerCaller();
    res.status(HTTP_OK_STATUS).send(data);
  });
  
router.get('/talker/:id', async (req, res) => {
    const data = await talkerCaller();
    const { id } = req.params;
    const result = data.find((c) => c.id === Number(id));
    if (!result) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(HTTP_OK_STATUS).send(result);
});
  module.exports = router;