const crypto = require('crypto');

const validate = (email, password, res) => {
  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    }); 
  }
  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
};

const loginFunc = (req, res) => {
  const { email, password } = req.body;
  validate(email, password, res);
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
     return res.status(400).json({
       message: 'O "email" deve ter o formato "email@email.com"',
     });
  }
  if (password.length < 6) {
    res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  
const token = crypto.randomBytes(8).toString('hex');
return res.status(200).json({ token });
};

module.exports = {
  loginFunc,
};