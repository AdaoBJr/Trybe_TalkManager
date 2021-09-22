const express = require('express');

const talkerRouter = express.Router();

const HTTP_OK_STATUS = 200;

const { talkersAll,
        talkerGet,
        postTalker, 
        putTalker, 
        deleteTalker, 
        filterTalkers } = require('./data');

const { tokenValidation,
        nameValidation,
        ageValidation,
        talkValidation,
        watchedAtValidation,
        rateValidation } = require('./middleware');

talkerRouter.post(
'/',
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
watchedAtValidation,
rateValidation,
async (request, response) => {
  const { body } = request;
  const talker = await postTalker(body);
  response.status(201).json(talker);
},
);

talkerRouter.get('/', async (_request, response) => {
  const talkers = await talkersAll();
  response.status(HTTP_OK_STATUS).json(talkers);
});

talkerRouter.get('/search', tokenValidation, async (request, response) => {
  const { q } = request.query;
  const talkers = await filterTalkers(q);
  response.status(HTTP_OK_STATUS).json(talkers);
});

talkerRouter.get('/:id', async (request, response) => {
const { id } = request.params;
const talker = await talkerGet(id);
if (!talker) return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
response.status(200).json(talker);
});

talkerRouter.put(
  '/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (request, response) => {
    const { id } = request.params;
    const { body } = request;
    const talker = await putTalker(id, body);
    response.status(200).json(talker);
  },
);

talkerRouter.delete(
  '/:id',
  tokenValidation,
  async (request, response) => {
    const { id } = request.params;
    await deleteTalker(id);
    response.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  },
);

module.exports = talkerRouter;
