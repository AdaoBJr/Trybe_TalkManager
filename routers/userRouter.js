const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const HTTP_OK_STATUS = 200;

const testEmail = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
    if (!email || email.length === 0) {
        res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

const testePassword = (req, res, next) => {
    const { password } = req.body;
    if (!password || password.length === 0) {
        res.status(400).json({
            message: 'O campo "password" é obrigatório',
        });
    }
    if (password.length < 6) {
        res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

router.post('/', testEmail, testePassword, (req, res) => {
    const newToken = crypto.randomBytes(8).toString('hex');
    res.status(HTTP_OK_STATUS).json({ token: newToken });
});

module.exports = router;