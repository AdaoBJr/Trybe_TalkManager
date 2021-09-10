const express = require('express');

const router = express.Router();

const fs = require('fs').promises;

const talkers = './talker.json';

router.get('/', (_request, response) => {
  let data = [];

  fs.readFile(talkers, 'utf8')
  .then((info) => JSON.parse(info))
  .then((info) => {
    data = info;
    return response.status(200).json(data);
  })
  .catch((e) => {
    response.status(400).json(e);
   });
});

router.get('/:id', (request, response) => {
  const { id } = request.params;

  fs.readFile(talkers, 'utf8')
  .then((info) => JSON.parse(info))
  .then((info) => {
    const filtered = info.find((item) => item.id === Number(id));
    
    if (!filtered) {
      return response.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    return response.status(200).json(filtered);
  });
});

module.exports = router;
