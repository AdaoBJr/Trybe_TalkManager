const express = require('express');
const rescue = require('express-rescue');
const { getTalkers, setTalkers } = require('../utils/getTalkers');

const { STATUS_OK_HTTP } = require('../stats/constants');

const router = express.Router();

const {
  nameAuth,
  ageAuth,
  dateAuth,
  rateAuth,
  talkAuth,
  tokenAuth,
} = require('../middlewares/middles');

router.get('/', async (_req, res) => {
  const talkers = await getTalkers();
  res.status(STATUS_OK_HTTP).json(talkers);
});

router.get('/search',
    tokenAuth,
    rescue(async (req, res) => {
      const { q: query } = req.query;
      const talkersList = await getTalkers();
      const searchTerm = talkersList.filter(
        (f) => f.name.toLowerCase().includes(query.toLowerCase()),
      );
      return res.status(STATUS_OK_HTTP).json(searchTerm);
    }));

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
  
      res.status(STATUS_OK_HTTP).json(updatedTalker);
    }));

router.delete('/:id',
    tokenAuth,
    rescue(async (req, res) => {
      const { id: paramId } = req.params;
      const talkersList = await getTalkers();
      const deleteTalker = talkersList.find(({ id }) => id !== +paramId);

      setTalkers(deleteTalker);
  
      res.status(STATUS_OK_HTTP).json({ message: 'Pessoa palestrante deletada com sucesso' });
    }));

module.exports = router;