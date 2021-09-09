const fs = require('fs').promises;

const jsonRead = './talker.json';

async function readData(_req, res) {
    const data = await fs.readFile('talker.json', 'utf-8');
    const dataJson = JSON.parse(data);

    if (!dataJson) {
        return res.status(200).json({ talkers: [] });
    }

    return res.status(200).json(dataJson);
}

async function filterTalkerId(req, res) {
    const { id } = req.params;
    const data = await fs.readFile('talker.json', 'utf-8');
    const dataJson = JSON.parse(data);
    const talkerFilter = dataJson.find((talker) => talker.id === Number(id));

    if (!talkerFilter) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(200).json(talkerFilter);
}

function checkEmail(req, res, next) {
    const { email } = req.body;
    const emailIsValid = /((\w+)@(\w+)\.(\w+))/;

    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }

    if (!email.match(emailIsValid)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    next();
}

function checkPassword(req, res, next) {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }

    next();
}

function checkToken(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            message: 'Token não encontrado',
        });
    }

    if (authorization.length !== 16) {
        return res.status(401).json({
            message: 'Token inválido',
        });
    }
    next();
}

function checkName(req, res, next) {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'O campo "name" é obrigatório',
        });
    }

    if (name.length < 3) {
        return res.status(400).json({
            message: 'O "name" deve ter pelo menos 3 caracteres',
        });
    }
    next();
}

function checkAge(req, res, next) {
    const { age } = req.body;

    if (!age) {
        return res.status(400).json({
            message: 'O campo "age" é obrigatório',
        });
    }

    if (Number(age) < 18) {
        return res.status(400).json({
            message: 'A pessoa palestrante deve ser maior de idade',
        });
    }
    next();
}

function checkTalk(req, res, next) {
    const { talk: { watchedAt, rate } } = req.body;
    const dateValidate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

    if (!watchedAt.match(dateValidate)) {
        return res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }

    if (Number(rate) < 1 || Number(rate) > 5) {
        return res.status(400).json({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5',
        });
    }

    next();
}

function checkTalkObj(req, res, next) {
    const { talk } = req.body;

    if (Object.keys(talk).length === 0) {
        return res.status(400).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }

    next();
}

async function addTalk(req, res) {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const data = await fs.readFile(jsonRead, 'utf-8');
    const dataJson = JSON.parse(data);
    const newTalker = {
        id: dataJson.length + 1,
        name,
        age,
        talk: {
            watchedAt,
            rate,
        },
    };
    dataJson.push(newTalker);
    await fs.writeFile('./talker.json', JSON.stringify(dataJson));
    return res.status(201).json(newTalker);
}

async function editTalker(req, res) {
    const { name, age, talk } = req.body;
    const { id } = req.params;

    const response = await fs.readFile(jsonRead, 'utf-8');
    let convert = JSON.parse(response);
    convert = convert.filter((talker) => talker.id !== Number(id));

    convert.push({ id: +id, name, age, talk });

    await fs.writeFile('./talker.json', JSON.stringify(convert));
    return res.status(200).json({ id: Number(id), name, age, talk });
}

async function deleteTalker(req, res) {
    const { id } = req.params;

    const data = await fs.readFile(jsonRead, 'utf-8');
    const dataJson = JSON.parse(data);
    const deletedTalker = dataJson.filter((talker) => talker.id !== Number(id));

    await fs.writeFile('./talker.json', JSON.stringify(deletedTalker));

    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
}

module.exports = {
    readData,
    filterTalkerId,
    checkEmail,
    checkPassword,
    checkToken,
    checkName,
    checkAge,
    checkTalk,
    checkTalkObj,
    addTalk,
    editTalker,
    deleteTalker,
};
//