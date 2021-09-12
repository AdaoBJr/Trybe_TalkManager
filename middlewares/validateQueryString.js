// Source: https://stackoverflow.com/questions/19035373/how-do-i-redirect-in-expressjs-while-passing-some-context

const validateQueryString = (req, res, next) => {
  if (!req.query.q || req.query.q === undefined || req.query.q === '') {
    res.redirect('/talker');
  }

  next();
};

module.exports = validateQueryString;
