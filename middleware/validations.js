const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const validEmail = email.match(/[a-z]+@[a-z]+.com/g);
  if(!email || email === '') {
    return res.status(400).json(
      {
        message: 'O campo "email" é obrigatório',
      },
    );
  };
  if(!validEmail){
    return res.status(400).json(
      {
        message: "O \"email\" deve ter o formato \"email@email.com\""
      },
    );
  };
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if(password.length < 6 && password.length !== 0){
    return res.status(400).json(
      {
        message: "O \"password\" deve ter pelo menos 6 caracteres"
      },
    );
  };
  if(!password || password === ''){
    return res.status(400).json(
      {
        message: "O campo \"password\" é obrigatório"
      },
    );
  };
  next();
};

const tokenize  = "abcdefghijklmnopqrstuvwxyzABCDEFGHIFJKLMNOPQRSTUVWXYX1234567890";
function shuffleWord (Word){
  let shuffledWord = '';
  Word = tokenize.split('');
  while (Word.length > 0) {
    shuffledWord +=  Word.splice(Word.length * Math.random() << 0, 1);
  }
  return shuffledWord;
}

const createToken = () => {
  const tokenEmbaralhado = shuffleWord();
  const token = tokenEmbaralhado.slice(0,16);
  return token;
}

module.exports = {
  validateEmail,
  validatePassword,
  createToken,
}