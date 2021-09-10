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
  searchTalker,
} = require('../middleweres/talkers');

router.route('/:id')
  .get(getTalkersById)
  .put(
    verifyToken,
    verifyName,
    verifyAge,
    verifyTalk,
    verifyWatchedAt,
    verifyRate,
    editTalker,
  )
  .delete(
    verifyToken,
    deleteTalker,
);

router.route('/search')
    .get(
      verifyToken,
      searchTalker,
    );

router.route('/')
  .get(getAllTalkers)
  .post(
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyWatchedAt,
  verifyRate,
  newTalker,
);

module.exports = router;
