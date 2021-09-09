const { Router } = require('express');

const router = Router();

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  } if (regex.test(email) === false) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  } 
  if (password.length <= 5) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return res.status(200).send({ token: '7mqaVRXJSp886CGr' });
});

module.exports = router;