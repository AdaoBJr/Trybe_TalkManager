module.exports = (err, _req, res, _next) => {
  if (err.code && err.status) {
    return res.status(err.status).json({ message: `Erro: ${err.message} Code: ${err.code}` });
  } return res.status(500).json({ message: err.message });
};
