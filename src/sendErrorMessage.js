module.exports = (code, message, res) => {
  res.status(code).json({
      message,
  });
};
