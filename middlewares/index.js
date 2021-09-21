const crypto = require('crypto');
const fs = require('fs').promises;

const generateToken = (req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
};

const authEmail = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);

    if (!email) { 
       return res.status(400).json({ 
           message: 'O campo "email" é obrigatório', 
        });
    }
    if (!emailRegex.test(email)) {
       return res.status(400).json(
            { message: 'O "email" deve ter o formato "email@email.com"' },
        );
    }

    next();
};

const authPassword = (req, res, next) => {
    const { password } = req.body;

    if (!password) {
       return res.status(400).json(
            { message: 'O campo "password" é obrigatório' },
        );
    }

    if (password.length < 6) {
      return res.status(400).json(
            { message: 'O "password" deve ter pelo menos 6 caracteres' },
        );
    }

    next();
};

const authToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ message: 'Token não encontrado' });
    }

    if (authorization.length !== 16) {
        return res.status(401).send({ message: 'Token inválido' });
    }

    next();
};

const authName = (req, res, next) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).send({ 
        message: 'O campo "name" é obrigatório' }); 
    }

    if (name.length <= 3) {
       return res.status(400).send(
            { message: 'O "name" deve ter pelo menos 3 caracteres' },
        );
    }

    next();
};

const authAge = (req, res, next) => {
    const { age } = req.body;

    if (!age) {
       return res.status(400).send({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
       return res.status(400).send({
            message: 'A pessoa palestrante deve ser maior de idade', 
        });
    }

    next();
};

const authTalk = (req, res, next) => {
    const { talk } = req.body;
    
    if (!talk || !talk.watchedAt || talk.rate === undefined) {
       return res.status(400).send(
            {
                message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
            },
        );
    }

    next();
};

const authWatchedAt = (req, res, next) => {
    const { watchedAt } = req.body.talk;
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const dateFormat = regex.test(watchedAt);

  if (!dateFormat) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  }

  next();
};

const authRate = (req, res, next) => {
    const { rate } = req.body.talk;
  if (!(rate > 0 && rate < 6)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const readFileJson = async () => {
    const talkers = fs.readFile('./talker.json', 'utf8');
    return talkers.then((data) => JSON.parse(data)).catch((err) => JSON.parse(err));
};

const talkerSearch = async (req, res) => {
    const { q } = req.query;
    const talkers = await readFileJson();
    if (!q || q === '') {
      return res.status(200).json(talkers);    
    }   
    const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));
    if (filteredTalkers.length > 0) {
      return res.status(200).json(filteredTalkers); 
    } 
    return res.status(200).json(Array.from([])); 
};

module.exports = {
    generateToken,
    authAge,
    authEmail,
    authName,
    authPassword,
    authRate,
    authToken,
    authWatchedAt,
    talkerSearch,
    authTalk,
};
