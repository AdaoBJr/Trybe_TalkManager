const express = require('express');
const crypto = require('crypto');

const app = express();
const bodyParser = require('body-parser');
const {
    readData,
    filterTalkerId,
    checkEmail,
    checkPassword,
    checkToken,
    checkName,
    checkAge,
    checkTalk,
    checkDate,
    checkRate,
    addTalk,
    editTalker,
    deleteTalker,
} = require('./middleware/index');

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
    response.status(HTTP_OK_STATUS).send();
});

// Rotas
app.get('/talker', readData);

app.get('/talker/:id', filterTalkerId);

app.post('/login', checkEmail, checkPassword, (_req, res) => {
    const token = crypto.randomBytes(8).toString('hex');

    return res.status(200).json({ token });
});

app.post('/talker', checkToken, checkName, checkAge, checkTalk, checkDate, checkRate, addTalk);

app.put('/talker/:id',
    checkToken, checkName, checkAge, checkTalk, checkDate, checkRate, editTalker);

app.delete('/talker/:id', checkToken, deleteTalker);

app.listen(PORT, () => {
    console.log('Online');
});