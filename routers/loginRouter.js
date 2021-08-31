const express = require('express');

const router = express.Router();

// fonte da função: https://ui.dev/validate-email-address-javascript/
const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// fonte: https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript/
function geraToken(tamanho) {
  let stringAleatoria = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < tamanho; i += 1) {
      stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return stringAleatoria;
}

router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!emailIsValid(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return res.status(200).json({ token: geraToken(16) });
});

module.exports = router;
