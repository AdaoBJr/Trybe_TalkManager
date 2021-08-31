const express = require('express');
const { token } = require('./funcoes');
const {
  validatePassWord,
  validationEmail,
  validationToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalk2,
} = require('./validations');

const router = express.Router();
const talker = require('./talker');

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const result = await talker();
  console.log(result);

  const filterId = result.find((pessoa) => pessoa.id === Number(id));
  if (!filterId) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  res.status(200).json(filterId);
});

router.get('/talker', async (req, res) => {
  const result = await talker();
  if (result.length === 0) {
    return res.status(200).json([]);
  }
  res.status(200).json(result);
});

router.post('/talker', validationToken,
validateName,
validateAge,
validateTalk,
validateTalk2, (req, res) => {
  res.status(200).json({'certo'});
});

router.post('/login', validationEmail, validatePassWord, (req, res) =>
res.status(200).json({ token }));

module.exports = router;