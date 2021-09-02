const checkTalk = (req, res, next) => {
    if (!req.body.talk || typeof req.body.talk.rate !== 'number' || !req.body.talk.watchedAt) {
      return res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }
    next();
  };
  
  module.exports = checkTalk;