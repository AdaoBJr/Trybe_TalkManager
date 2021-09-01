const express = require('express');

const IoConnection = require('../services/ioConnection');

const { 
   validateToken, 
   validateName,
   validateAge, 
   validateWatchedAt,
   validateRate,
   validateTalk,
  } = require('../middleware/postValidationMiddleware');

const router = express.Router(); 

router.get('/', async (_req, res) => {
  try {
    const io = new IoConnection();
    const users = await io.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/search', validateToken, async (req, res) => {
  const { q: query } = req.query;
  try {
    const io = new IoConnection();
    const users = await io.search(query);
    return res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const io = new IoConnection();
    const user = await io.getById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.use(validateToken);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const io = new IoConnection();
    await io.delete(id);
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    console.log(error.message);
  }
});

router.use(validateName);
router.use(validateAge);
router.use(validateTalk);
router.use(validateWatchedAt);
router.use(validateRate);

router.post('/', async (req, res) => {
  const document = req.body;
  try {
    const io = new IoConnection();
    await io.create(document);
    res.status(201).json(document);
  } catch (error) {
    console.log(error.message);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const document = req.body;
  try {
    const io = new IoConnection();
    await io.update(document, id);
    res.status(200).json(document);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;