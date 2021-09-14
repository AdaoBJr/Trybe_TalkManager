const express = require('express');

const router = express.Router();
const crypto = require('crypto');

const HTTP_OK_STATUS = 200;
const HTTP_LOGIN_ERROR_STATUS = 400;

const authEmail = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);

    if (!email) { 
       return res.status(HTTP_LOGIN_ERROR_STATUS).json({ 
           message: 'O campo "email" é obrigatório', 
        });
    }
    if (!emailRegex.test(email)) {
       return res.status(HTTP_LOGIN_ERROR_STATUS).json(
            { message: 'O "email" deve ter o formato "email@email.com"' },
        );
    }

    next();
};

const authPassword = (req, res, next) => {
    const { password } = req.body;

    if (!password) {
       return res.status(HTTP_LOGIN_ERROR_STATUS).json(
            { message: 'O campo "password" é obrigatório' },
        );
    }

    if (password.length < 6) {
      return res.status(HTTP_LOGIN_ERROR_STATUS).json(
            { message: 'O "password" deve ter pelo menos 6 caracteres' },
        );
    }

    next();
};

router.post('/', authEmail, authPassword, (req, res) => {
    const newToken = crypto.randomBytes(8).toString('hex');
   return res.status(HTTP_OK_STATUS).json({ token: newToken }); 
});

module.exports = router;
