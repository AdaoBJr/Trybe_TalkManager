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

router.get('/', getAllTalkers);
router.get('/:id', getTalkersById);

router.post(
  '/',
  verifyToken,
  verifyWatchedAt,
  verifyName,
  verifyTalk,
  verifyAge,
  verifyRate,
  newTalker,
);

module.exports = router;
