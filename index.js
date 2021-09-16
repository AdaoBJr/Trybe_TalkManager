import express from 'express';
import { json } from 'body-parser';
import middlewares from './middlewares/getTalker';

const app = express();
app.use(json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', middlewares);

app.listen(PORT, () => {
  console.log(`Online em localhost:${PORT}`);
});
