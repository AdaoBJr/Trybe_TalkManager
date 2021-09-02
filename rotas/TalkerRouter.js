//------------------------------
// Lendo o arquivo talker,json
const express = require('express');

const fs = require('fs').promises;

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_NOT_OK_STATUS = 400;
const UNAUTHORIZED_STATUS = 401;

// Validação Token
const tokenValidation = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || authorization === '') {
        return res.status(UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
    }
    if (authorization.length < 16) {
        return res.status(UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
    }
    return next();
};

// Validação Name
const nameValidation = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(HTTP_NOT_OK_STATUS).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(HTTP_NOT_OK_STATUS)
        .json({ message: 'O campo "name" deve ter pelo menos 3 caracteres' });
    }
    return next();
};

// Validação Age
const ageValidation = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(HTTP_NOT_OK_STATUS).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
        return res.status(HTTP_NOT_OK_STATUS)
        .json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    return next();
};

// Validação Talk
const talkValidation = (req, res, next) => {
    const { talk } = req.body;
    if (!talk || !talk.watchedAt || !talk.rate) {
        return res.status(HTTP_NOT_OK_STATUS)
        .json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }
    return next();
};

// Validação WatchedAt
const watchedAtValidation = (req, res, next) => {
    const { talk } = req.body;
    const dateRegex = RegExp(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/);
    if (!dateRegex.test(talk.watchedAt)) {
        return res.status(HTTP_NOT_OK_STATUS)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    return next();
};

// Validação Rate
const RateValidation = (req, res, next) => {
    const { talk } = req.body;
    if (talk.rate < 1 || talk.rate > 5) {
        return res.status(HTTP_NOT_OK_STATUS)
        .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    return next();
};

// Vai ler o meu arquivo e retorna uma promisse
const readTalkers = async () => {
    const talkers = await fs.readFile('./talker.json', 'utf-8');
    return JSON.parse(talkers);
};

// Vai setar os novos Talkers
const setTalkers = (newTalkers) => fs.writeFile('./talker.json', JSON.stringify(newTalkers));

//---------------------------------------------------------------------------------------------------

// Resolvo a promisse do READFILE e criando o andpoint GET
router.get('/', async (req, res) => {
    const resolvedTalkers = await readTalkers();
    res.status(HTTP_OK_STATUS).send(resolvedTalkers);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await readTalkers();
    const talker = talkers.find((talk) => talk.id === Number(id));
    if (!talker) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(HTTP_OK_STATUS).json(talker);
});

router.post('/',
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
watchedAtValidation,
RateValidation,
async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await readTalkers();
    talkers.push({
        id: talkers.length + 1,
        name,
        age,
        talk,
    });
    await setTalkers(talkers);
    console.log(talkers);
    res.status(201).send(talkers);
});

module.exports = router;
