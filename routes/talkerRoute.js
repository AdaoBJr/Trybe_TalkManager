const express = require('express');
const {
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyDateAndRate,
} = require('../middlewares/verifyCredentials');

const router = express.Router();
const {
  getAllTalkers,
  getTalker,
  createTalker,
  updateTalker,
} = require('../controllers/talkerController');

router
  .route('/')
  .get(getAllTalkers)
  .post(
    verifyToken,
    verifyName,
    verifyAge,
    verifyTalk,
    verifyDateAndRate,
    createTalker,
  );

router.route('/:id').get(getTalker).put(
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyDateAndRate, updateTalker,
);

module.exports = router;
