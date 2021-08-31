const express = require('express');
const rescue = require('express-rescue');
const { getTalkers, setTalkers } = require('../utils/getTalkers');

const { STATUS_OK_HTTP } = require('../stats/constants');

const router = express.Router();

const {
    tokenAuth,
    nameAuth,
    ageAuth,
    dateAuth,
    rateAuth,
    talkAuth,
} = require('../middlewares/middles');

router.get('/', async (_req, res) => {
  const talkers = await getTalkers();
  res.status(STATUS_OK_HTTP).json(talkers);
});

router.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const talkersList = await getTalkers();
    const talker = talkersList.find((f) => f.id === Number(id));
    if (!talker || talker === undefined) { 
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
    }
    
    res.status(STATUS_OK_HTTP).json(talker);
  }),
);

router.post('/',
    tokenAuth,
    nameAuth,
    ageAuth,
    talkAuth,
    dateAuth,
    rateAuth,
    rescue(async (req, res) => {
      const talkerList = await getTalkers();
      const newTalker = { ...req.body, id: talkerList.length + 1 };
      const updateTalkers = [...talkerList, newTalker];

      await setTalkers(updateTalkers);

      res.status(201).json(newTalker);
    }));

router.put('/:id',
    tokenAuth,
    nameAuth,
    ageAuth,
    talkAuth,
    dateAuth,
    rateAuth,
    rescue(async (req, res) => {
      const { id: paramId } = req.params;
      const talkersList = await getTalkers();
      const filteredTalkersList = talkersList.filter(
        ({ id }) => id !== parseInt(paramId, 10),
      );
      const updatedTalker = { ...req.body, id: parseInt(paramId, 10) };
  
      const updatedTalkersList = [...filteredTalkersList, updatedTalker];
  
      await setTalkers(updatedTalkersList);
  
      res.status(200).json(updatedTalker);
    }));

router.delete('/:id',
    tokenAuth,
    rescue(async (req, res) => {
      const { id: paramId } = req.params;
      const talkersList = await getTalkers();
      const deleteTalker = talkersList.find(({ id }) => id !== +paramId);

      setTalkers(deleteTalker);
  
      res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
    }));

module.exports = router;