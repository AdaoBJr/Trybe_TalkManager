import express from 'express';
import bodyParser from 'body-parser';
import {
  getAllTalkers, getTalkersById, checkLogin,
  createTalker, updateTalker, deleteTalker, searchTalker } from './src/middlewares';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', searchTalker);
app.get('/talker/:id', getTalkersById);
app.get('/talker', getAllTalkers);
app.post('/talker', createTalker);
app.put('/talker/:id', updateTalker);
app.delete('/talker/:id', deleteTalker);

app.post('/login', checkLogin);

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});
