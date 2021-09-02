const fs = require('fs').promises;
const router = require('express').Router();
const crypto = require('crypto');

const {
    isValidEmail, 
    isValidPassword, 
    isValidToken, 
    isValidName, 
    isValidAge,
    isValidTalkWatchedAt,
    isValidTalkRate,
  } = require('./middleware');

router.post(
    '/login',
    isValidEmail,
    isValidPassword,
    (_req, res) => { 
    const tok = crypto.randomBytes(8).toString('hex');
    console.log(tok);
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

const talkerWriter = async () => {
    const data = await fs.writeFile('./talker.json', 'utf-8');
    return JSON.parse(data);
};

// router.get('talker', async (req, res) => {
//     const data = await talkerCaller();
//     console.log(data);
//     res.status(HTTP_OK_STATUS).send(data);
//   });
  
// router.get('talker/:id', async (req, res) => {
//     const data = await talkerCaller();
//     const { id } = req.params;
//     const result = data.find((c) => c.id === Number(id));
//     if (!result) {
//     return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
//     }
//     res.status(HTTP_OK_STATUS).send(result);
// });

router.post('/talker', isValidToken, isValidPassword,
 isValidName, isValidAge, isValidTalkWatchedAt, isValidTalkRate, 
    async (req, res) => {
    const { name, age, talk: { watchedAt }, talk: { rate } } = req.body;
    const data = await talkerWriter();
    data.push({ name, age, watchedAt, rate });
    res.status(201).send(data);
});
  module.exports = router;