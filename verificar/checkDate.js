const checkDate = (req, res, next) => {
    const dateRegex = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g;
    if (!dateRegex.test(req.body.talk.watchedAt)) {
      return res.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
    }
    next();
  };
  
  module.exports = checkDate;