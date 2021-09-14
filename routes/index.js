const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;
const HTTP_TOKEN_ERROR_STATUS = 401;
const HTTP_USER_ERROR_STATUS = 400;

const readFile = async () => {
    const talkers = await fs.readFile('./talker.json', 'utf8');
    return JSON.parse(talkers);
};

const authToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(HTTP_TOKEN_ERROR_STATUS).send({ message: 'Token não encontrado' });
    }

    if (authorization.length < 16) {
        return res.status(HTTP_TOKEN_ERROR_STATUS).send({ message: 'Token inválido' });
    }

    next();
};

const authName = (req, res, next) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(HTTP_USER_ERROR_STATUS).send({ 
        message: 'O campo "name" é obrigatório' }); 
    }

    if (name.length <= 3) {
       return res.status(HTTP_USER_ERROR_STATUS).send(
            { message: 'O "name" deve ter pelo menos 3 caracteres' },
        );
    }

    next();
};

const authAge = (req, res, next) => {
    const { age } = req.body;

    if (!age) {
       return res.status(HTTP_USER_ERROR_STATUS).send({ message: 'O campo "age" é obrigatório' });
    }
    if (Number(age) < 18) {
       return res.status(HTTP_USER_ERROR_STATUS).send({
            message: 'A pessoa palestrante deve ser maior de idade', 
        });
    }

    next();
};

const authTalk = (req, res, next) => {
    const { talk } = req.body;
    
    if (!talk || talk.watchedAt.length === undefined || talk.rate.length === undefined) {
       return res.status(400).send(
            {
                message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
            },
        );
    }

    next();
};

const authWatchedAt = (req, res, next) => {
    const { talk } = req.body;

    const dateRegex = new RegExp(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i);
    if (!dateRegex.test(talk.watchedAt)) {
       return res.status(400).send({ 
           message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', 
        });
    }

    next();
};

const authRate = (req, res, next) => {
    const { talk } = req.body;
    
    if (talk.rate <= 0 || talk.rate >= 6) {
       return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

const setNewTalker = async (talker) => {
    await fs.writeFile('./talker.json', JSON.stringify(talker));
};

router.get('/', async (_req, res) => {
    const talkers = await readFile();
    res.status(HTTP_OK_STATUS).json(talkers);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await readFile();
    const findTalker = talkers.find((talker) => talker.id === Number(id));

    if (findTalker) {
        return res.status(HTTP_OK_STATUS).json(findTalker);
    }
    return res.status(HTTP_ERROR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
});

router.post('/',
    authAge,
    authName,
    authRate,
    authTalk,
    authToken,
    authWatchedAt,
    async (req, res) => {
        const talkers = await readFile();
        const newTalker = { ...req.body, id: talkers.length + 1 };
        const updatedTalkers = [...talkers, newTalker];
        await setNewTalker(updatedTalkers);

        res.status(201).json(newTalker);
    });

router.put('/:id',
    authAge,
    authName,
    authRate,
    authTalk,
    authToken,
    authWatchedAt,
    async (req, res) => {
        const { id } = req.params;
        const talkers = await readFile();
        const talkersEd = talkers.filter((t) => t.id !== Number(id));
        const newTalker = { ...req.body, id: Number(id) };
        const updatedTalkers = [...talkersEd, newTalker];
        await setNewTalker(updatedTalkers);
        res.status(200).json(newTalker);
});

router.delete('/:id', authToken, async (req, res) => {
    const { id } = req.params;
    const talkers = await readFile();
    const talkersId = talkers.filter((t) => t.id !== Number(id));
    await setNewTalker(talkersId);
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
