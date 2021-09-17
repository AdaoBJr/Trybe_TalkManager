const {
  getAllTalkers,
} = require('./fsModule');
const {
  token,
} = require('./loginRoute');

async function getTalkerById(req, res) {
  const {
    id,
  } = req.params;
  const talkers = await getAllTalkers;
  const talkerById = talkers.find((talker) => talker.id === parseInt(id, 10));

  if (talkerById) return res.status(200).json(talkerById);

  return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
}

const validatesDate = (date) => {
  const regex = new RegExp('^[0-9]{2}/[0-9]{2}/[0-9]{4}$');
  return regex.test(date);
};

async function checkHeaderToken(req, res, next) {
  const {
    authorization,
  } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  console.log(`auth: ${authorization}, token: ${token}`);

  if (authorization.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }

  next();
}

const validateTalker = (req, res, next) => {
  const {
    name,
    age,
    talk,
  } = req.body;

  if (!name) {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (parseInt(name.length, 10) < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  if (age % 1 !== 0) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  if(!talk) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'
    })
  }
  if(!talk.watchedAt || !talk.rate || !talk && Object.keys(talk).length === 0) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'
    })
  }
  if (!validatesDate(talk.watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"'
    })
  }
  if (talk.rate % 1 !== 0) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5'
    })
  }
  if(talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5'
    })
  }

  next();
};

module.exports = {
  getTalkerById,
  checkHeaderToken,
  validateTalker,
};