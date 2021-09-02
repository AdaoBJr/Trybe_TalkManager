const express = require('express');
const handleReadFile = require('../helpers/handleReadFile');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;

// 1º Requisito:

const getTalkers = (_req, res) => {
  handleReadFile()
  .then((talkers) => JSON.parse(talkers))
  .then((talkers) => res.status(HTTP_OK_STATUS).json(talkers))
  .catch((err) => res.status(400).json({ message: `Error ${err}` }));
};

module.exports = getTalkers;
