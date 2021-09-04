import express from 'express';
import bodyParser from 'body-parser';
import middlewares from './src/middlewares';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', middlewares);

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});
