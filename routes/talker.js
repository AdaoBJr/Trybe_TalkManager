const express = require('express');

const router = express.Router();

const {
  getAllTalkers,
  getTalkersById,
} = require('../middleweres/talkers');

router.get('/', getAllTalkers);
router.get('/:id', getTalkersById);

module.exports = router;
