const error = (err, _req, res, _next) => res.status(err.status).json({ message: err.status });

module.exports = error;