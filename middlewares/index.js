const { talkerSearch } = require('./MiddleSearch');
const { palestrantes } = require('./MiddleTalkerGet');
const { talkerId } = require('./MiddleTalkerId');
const { loguin } = require('./MiddleLoguin');
const { post } = require('./MiddlePostTalker');
const { putFunction } = require('./MiddlePutTalker');
const { exclude } = require('./MiddleExclude');

module.exports = {
  talkerSearch,
  palestrantes,
  talkerId,
  loguin,
  post,
  putFunction,
  exclude,
};
