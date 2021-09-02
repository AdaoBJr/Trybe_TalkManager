// const express = require('express');
const handleReadFile = require('../helpers/handleReadFile');

// const app = express();
// app.use(express.json());

const HTTP_OK_STATUS = 200;

// 1º Requisito:

const getTalkers = (_req, res) => {
  handleReadFile()
  .then((talkers) => JSON.parse(talkers))
  .then((talkers) => res.status(HTTP_OK_STATUS).json(talkers))
  .catch((err) => res.status(400).json({ message: `Error ${err}` }));
};

// 2º Requisito:

const getTalkerByID = (req, res) => {
  const { id } = req.params;

  handleReadFile()
  .then((talkers) => JSON.parse(talkers))
  .then((talkers) => {
    const talker = talkers.find((e) => e.id === Number(id));
    
    if (!talker) {
      return res.status(404).json({
        message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(HTTP_OK_STATUS).json(talker);
  })
  .catch((err) => res.status(400).json({ message: `Error ${err}` }));
};

module.exports = {
  getTalkers,
  getTalkerByID,
};
