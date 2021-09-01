const express = require('express');
 // const talker = require('../talker.json');

 const OK_STATUS = 200;
 const NOT_FOUND_STATUS = 404;

const { readFile,
   validaToken,
    validaName,
     validaAge,
      validaTalker,
       validaTalkerFormato,
        createNewPalestrant,
        searchTalker } = require('../middleware');

const router = express.Router();

// 7
router.get('/search', validaToken, searchTalker);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await readFile();
  const palestrante = result.find((elem) => elem.id === Number(id));
  if (!palestrante) {
  return res.status(NOT_FOUND_STATUS).json({
    message: 'Pessoa palestrante não encontrada',
  });
  }
  res.status(OK_STATUS).json(palestrante);
});

router.get('/', async (req, res) => {
  const result = await readFile();
  if (!result) {
  return res.status(OK_STATUS).json([]);
  }
  return res.status(OK_STATUS).json(result);
});

// 5
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const list = await readFile('../talker.json');
  const result = list.find((elem) => elem.id === Number(id));
  return res.status(200).json(result);
});

router.post('/', validaToken,
 validaName,
  validaAge,
   validaTalker,
    validaTalkerFormato,
     createNewPalestrant);

module.exports = router;