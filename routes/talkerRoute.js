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

router.route('/:id').get(getTalker);

module.exports = router;
