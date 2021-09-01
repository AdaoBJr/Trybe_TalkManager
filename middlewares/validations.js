// const validateUserName = (req, res, next) => {
//   const { username } = req.body;

//   if (!username || username < 3) {
//     res.status(400).json({ message: 'Invalid username' });
//   }

//   next();
// };

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const validateToken = (req, res, next) => {
  const { token } = req.headers;
  if (!token || token === '') {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (typeof age !== 'number') {
    return res
      .status(400)
      .json({ message: 'O campo "age" deve ser um inteiro' });
  }

  if (age < 18) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const talkRateOk = (rate) => rate > 0 && rate < 6;
const talkNotExists = (talk) =>
  !talk && talk.watchedAt === '' && talk.rate === '';

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (talkNotExists(talk)) {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!talk.watchedAt.match(/^\d{2}\/\d{2}\/\d{4}$/gm)) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!talkRateOk(talk.rate)) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  // validateUserName,
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
};
