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
  editTalker,
  deleteTalker,
} = require('../middleweres/talkers');

router.route('/:id')
  .get(getTalkersById)
  .put(
    verifyToken,
    verifyName,
    verifyTalk,
    verifyWatchedAt,
    verifyAge,
    verifyRate,
    editTalker,
  )
  .delete(
    verifyToken,
    deleteTalker,
);

router.route('/')
  .get(getAllTalkers)
  .post(
  verifyToken,
  verifyName,
  verifyTalk,
  verifyWatchedAt,
  verifyAge,
  verifyRate,
  newTalker,
);

module.exports = router;
