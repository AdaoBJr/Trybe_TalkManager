const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const emailValidation = (req, res, next) => {
    const { email } = req.body;
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const validEmail = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i);

    if (!email) {
        return res.status(404).json({ message: 'O campo "email" é obrigatório' });
    }
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
    if (!validEmail.test(email)) {
        return res.status(404).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    return next();
};

const passwordValidation = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        return res.status(404).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(404).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    return next();
};

router.post('/login', emailValidation, passwordValidation, (req, res) => {
    const Token = crypto.randomBytes(8).toString('hex');
    res.status(200).json({ token: Token });
});

module.exports = router;