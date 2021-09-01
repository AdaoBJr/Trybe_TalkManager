const express = require('express');

const router = express.Router();

const fs = require('fs').promises;

const testToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send({ message: 'Token não encontrado' });
    if (authorization.length < 16) return res.status(401).send({ message: 'Token inválido' });
    next();
};

const testUserName = (req, res, next) => {
    const { name } = req.body;
    if (!name) return res.status(400).send({ message: 'O campo "name" é obrigatório' });
    if (name.length <= 3) {
        return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const testUserAge = (req, res, next) => {
    const { age } = req.body;
    if (!age || age.length === 0) {
        return res.status(400).send({ message: 'O campo "age" é obrigatório' });
    }
    if (Number(age) < 18) {
        return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const testUserTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk || talk.watchedAt === undefined || talk.rate === undefined) {
        return res.status(400).send(
            {
                message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
            },
        );
    }
    next();
};

const testUserTalkData = (req, res, next) => {
    const { talk } = req.body;
    const dataRegex = new RegExp(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i);
    if (!dataRegex.test(talk.watchedAt)) {
        return res.status(400).send(
            { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
);
    }
    next();
};

const testUserTalkRate = (req, res, next) => {
    const { talk } = req.body;
    if (talk.rate <= 0 || talk.rate >= 6) {
        return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

const getTalkers = async () => {
    const talkers = await fs.readFile('./talker.json', 'utf8');
    return JSON.parse(talkers);
};

const setTalker = async (talker) => {
    await fs.writeFile('./talker.json', JSON.stringify(talker));
};

router.get('/', async (req, res) => {
    const talkers = await getTalkers();
    return res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await getTalkers();
    const talker = talkers.find((talk) => talk.id === Number(id));
    if (!talker || talker === undefined) {
       return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }
  return res.status(200).json(talker);
});

router.get('/search', (req, res) => {
    const { q } = req.query;
   return res.status(200).json({ message: q });
});

router.post('/',
    testToken,
    testUserName,
    testUserAge,
    testUserTalk,
    testUserTalkData,
    testUserTalkRate,
    async (req, res) => {
        const talkers = await getTalkers();
        const newTalker = { ...req.body, id: talkers.length + 1 };
        const updatedTalkers = [...talkers, newTalker];
        await setTalker(updatedTalkers);
       return res.status(201).json(newTalker);
    });

router.put('/:id',
    testToken,
    testUserName,
    testUserAge,
    testUserTalk,
    testUserTalkData,
    testUserTalkRate,
    async (req, res) => {
        const { id } = req.params;
        const talkers = await getTalkers();
        const talkersEd = talkers.filter((t) => t.id !== Number(id));
        const newTalker = { ...req.body, id: Number(id) };
        const updatedTalkers = [...talkersEd, newTalker];
        await setTalker(updatedTalkers);
       return res.status(200).json(newTalker);
    });

router.delete('/:id', testToken, async (req, res) => {
    const { id } = req.params;
    const talkers = await getTalkers();
    const talkersEd = talkers.filter((t) => t.id !== Number(id));
    await setTalker(talkersEd);
   return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;