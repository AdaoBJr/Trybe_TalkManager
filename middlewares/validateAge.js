const { StatusCodes: { BAD_REQUEST } } = require('http-status-codes');

module.exports = (req, res, next) => {
  const { age } = req.body;
  
  if (!age || Number.isNaN(age)) {  
    return res.status(BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(BAD_REQUEST).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
next();
};
