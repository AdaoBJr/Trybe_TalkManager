const express = require('express');
const genToken = require('../services/genToken');
const authLogin = require('../auth/authLogin');

const login = express.Router();

login.post('/', authLogin, (_req, res) => res.status(200).json({ token: genToken() }));

module.exports = login;
