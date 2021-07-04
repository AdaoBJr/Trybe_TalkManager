const SERVER_ERROR = 500;
exports.errorHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  return res
    .status(err.errCode || SERVER_ERROR)
    .json({ message: err.message || 'Internal Server Error' });
};
