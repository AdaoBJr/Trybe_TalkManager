const fs = require('fs').promises;

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

// function checkToken(req, res, next) {
//   const { authorization } = req.headers;
// }

module.exports = {
    readData,
    filterTalkerId,
    checkEmail,
    checkPassword,
};