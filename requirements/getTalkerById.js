/* const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); */
/* const rescue = require('express-rescue'); */
/* const fs = require('fs'); */
/* const { getAllTalkers } = require('./functions');

const PORT = '3000'; */
 /*  function getTalkers() {
    return fs.readFile('../talker.json', 'utf-8')
      .then((fileContent) => JSON.parse(fileContent));
  } */
/*
  app.get('/talker/:id', async (req, res) => {
    const talkers = await getAllTalkers();
    const { id } = req.params;
    const getId = talkers.find((talkerId) => talkerId.id === parseInt(id, 10));
    if (!getId) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(getId); */

/*     const talkerId =
    return res.
    const talkerId = await getTalkers(); */
/*   });

  app.listen(PORT, () => {
    console.log('TEste');
  }); */