const { MESSAGES } = require('../messages');
const { verifyRateValueAndFormat, isValidDate } = require('../functions');

function nameAndAgeVerificarions(req, res, next) {
  const { name, age } = req.body;
  if (!name) return res.status(400).send({ message: MESSAGES.emptyName });
  if (name.length < 3) return res.status(400).send({ message: MESSAGES.wrongNameLength });
  if (!age) return res.status(400).send({ message: MESSAGES.emptyAge });
  if (age < 18) return res.status(400).send({ message: MESSAGES.minorAge });
  next();
}

function talkExists(req, res, next) {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) { 
    return res.status(400).send({ message: MESSAGES.noEmptyTalk }); 
  }
  next();
}

function talkVerifications(req, res, next) {
  const { talk: { watchedAt, rate } } = req.body;
  const validDate = isValidDate(watchedAt);
  if (!validDate) return res.status(400).send({ message: MESSAGES.invalidDateFormat });
  const isValidRate = verifyRateValueAndFormat(rate);
  if (!isValidRate) return res.status(400).send({ message: MESSAGES.invalidRating });
  next();
}

module.exports = {
  nameAndAgeVerificarions,
  talkVerifications,
  talkExists,
};
