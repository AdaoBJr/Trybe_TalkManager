const db = require('../db');

exports.createReqCtx = async (req, _res, next) => {
  const data = await db.readData().catch(next);
  if (!data) return next(data);
  req.context = {
    data,
  };
  return next();
};
