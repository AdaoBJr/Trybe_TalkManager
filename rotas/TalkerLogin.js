const express = require('express');
const crypto = require('crypto');

const router = express.Router();

// Validação do email
const emailValidation = (req, res, next) => {
    const { email } = req.body;
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const validEmail = new RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}(\.[a-z0-9]+)?$/);

    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
    if (!validEmail.test(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    return next();
};

// Validação da senha
const passwordValidation = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    return next();
};

// endpoint tipo POST que usa as funções de validação email/senha e gera um token
router.post('/', emailValidation, passwordValidation, (req, res) => {
    const Token = crypto.randomBytes(8).toString('hex');
    console.log(Token);
    res.status(200).json({ token: Token });
});

module.exports = router;