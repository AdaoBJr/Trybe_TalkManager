const verifyTalk = (req, res, next) => {
  const { talk } = req.body;
  
  next();
};

module.exports = verifyTalk;