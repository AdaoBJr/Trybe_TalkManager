const express = require('express');

const controller = require('../controllers');

const auth = require('../middlewares/validations');

const router = express.Router();

router.get('/', controller.getAllTalkers);
router.get('/:id', controller.getTalkerById);

router.post('/',
  auth.validateToken,
  auth.validateTalkerObject,
  auth.isTalkValid,
  auth.talkObjectValidation,
  controller.createTalker);

module.exports = router;
