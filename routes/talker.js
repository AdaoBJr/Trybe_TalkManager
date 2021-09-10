const express = require('express');

const router = express.Router();

const {
  getAllTalkers,
  getTalkersById,
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyWatchedAt,
  verifyRate,
  newTalker,
} = require('../middleweres/talkers');

router.get('/:id', getTalkersById);
router.get('/', getAllTalkers);

router.post(
  '/',
  verifyToken,
  verifyName,
  verifyTalk,
  verifyWatchedAt,
  verifyAge,
  verifyRate,
  newTalker,
  );

module.exports = router;
