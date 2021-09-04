import express from 'express';
import bodyParser from 'body-parser';
import { getAllTalkers, getTalkersById } from './src/middlewares';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', getTalkersById);
app.get('/talker', getAllTalkers);

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});
