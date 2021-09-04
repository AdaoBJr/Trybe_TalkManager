const express = require('express');

const router = express.Router();

const { getAll, getFilterId } = require('../middlewares/index');

router.get('/', getAll);

router.get('/:id', getFilterId);

module.exports = router;
