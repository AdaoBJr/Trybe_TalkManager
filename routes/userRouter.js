const fs = require('fs').promises;
const router = require('express').Router();
const crypto = require('crypto');

const { isValidEmail, isValidPassword } = require('./middleware');
const { isValidToken } = require('./validToken');
const { isValidName } = require('./validName');
const { isValidAge } = require('./validAge');
const { isValidTalkWatchedAt } = require('./validTalkWatched');
const { isValidTalkRate } = require('./validTalkRate');

router.post(
    '/login',
    isValidEmail,
    isValidPassword,
   (_req, res) => { 
    const tok = crypto.randomBytes(8).toString('hex');
    res.status(200).json({ token: tok });
    },
);

// router.post(
//     '/talker',
//     (_req, res) => { 
//     const tok = crypto.randomBytes(8).toString('hex');
//     console.log(tok);
//     res.status(200).json({ token: tok });
//     },
// );

const talkerCaller = async () => {
    const data = await fs.readFile('./talker.json', 'utf-8');
    return JSON.parse(data);
};

const talkerWriter = (content) => fs.writeFile('./talker.json', JSON.stringify(content));

router.post('/talker', isValidToken, isValidName,
isValidAge, isValidTalkWatchedAt, isValidTalkRate,
 async (req, res) => {
    const { name, age, talk } = req.body;
    const data = await talkerCaller();

    const newSpeaker = { 
    id: data.length + 1,
    name, 
    age, 
    talk,
    };

    data.push(newSpeaker);

    await talkerWriter(data);
    res.status(201).json(newSpeaker);
 });

 router.put('/talker/:id', isValidToken, isValidName,
 isValidAge, isValidTalkWatchedAt, isValidTalkRate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const data = await talkerCaller();
    const result = data.findIndex((dat) => dat.id === +id);

    data[result] = { id: Number(id), name, age, talk };
    await talkerWriter(data);
    res.status(200).send(data[result]);
  });

module.exports = router;