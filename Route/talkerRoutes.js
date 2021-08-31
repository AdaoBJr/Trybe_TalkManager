const express = require('express');
const controller = require('../controllers');
const auth = require('../middlewares/validations');

const router = express.Router();

router.get('/', controller.getAllTalkers);
router.get('/:id', controller.getTalkerById);

router.use(
  auth.validateToken,
  auth.validateTalkerObject,
  auth.isTalkValid,
  auth.talkObjectValidation,
);

router.post('/', controller.createTalker);
// router.put('/:id', controller.editTalker);

module.exports = router;
