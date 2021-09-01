const express = require('express');

 const OK_STATUS = 200;
 const NOT_FOUND_STATUS = 404;

const { readFile,
   validaToken,
    validaName,
     validaAge,
      validaTalker,
       validaTalkerFormato,
        createNewPalestrant,
         searchTalker,
          deletetTalker, editTalker } = require('../middleware');

const router = express.Router();

// 7
router.get('/search', validaToken, searchTalker);

// 2
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await readFile();
  const palestrante = result.find((elem) => elem.id === Number(id));
  if (!palestrante) {
  return res.status(NOT_FOUND_STATUS).json({
    message: 'Pessoa palestrante não encontrada',
  });
  }
  return res.status(OK_STATUS).json(palestrante);
});

// 1
router.get('/', async (_req, res) => {
  const result = await readFile();
  if (!result) {
  return res.status(OK_STATUS).json([]);
  }
  return res.status(OK_STATUS).json(result);
});

// requesito 6
router.delete('/:id', validaToken, deletetTalker);

// 5
router.put('/:id', validaToken,
validaName,
 validaAge,
  validaTalker,
   validaTalkerFormato,
    editTalker);

// 4
router.post('/', validaToken,
 validaName,
  validaAge,
   validaTalker,
    validaTalkerFormato,
     createNewPalestrant);

module.exports = router;