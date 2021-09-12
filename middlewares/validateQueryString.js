// Source: https://stackoverflow.com/questions/19035373/how-do-i-redirect-in-expressjs-while-passing-some-context

const validateQueryString = (req, res, next) => {
  if (!req.query.name || req.query.name === undefined || req.query.name === '') {
    res.redirect('/talker');
  }

  next();
};

module.exports = validateQueryString;
