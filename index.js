const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const { 
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  isValidDate,
  isValidRate,
  isValidTalk,
  createToken, 
} = require('./middlewares/validation');

const talkerJson = './talker.json';
fs.readFileSync(talkerJson);

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile(talkerJson, (err, content) => {
    if (err) {
      return res.status(200).json([]);
    }
    return res.status(200).json(JSON.parse(content.toString('utf8')));
  });
});

app.get('/talker/search', isValidToken, (req, res) => {
  const { query } = req.query;
  
  fs.readFile(talkerJson, 'utf8', (_err, content) => {
    const data = JSON.parse(content);

    if (!query) {
      return res.status(200).json(data);
    }

    const filterTalker = data.filter(({ name }) => name.includes(query));
    return res.status(200).json(filterTalker); 
  });
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  
  fs.readFile(talkerJson, 'utf8', (_err, content) => {    
    const data = JSON.parse(content);
    const findTalker = data.find((talker) => talker.id === Number(id));
    
    if (!findTalker) {
      return res.status(404).json({
       message: 'Pessoa palestrante não encontrada' }); 
      }
      return res.status(200).json(findTalker);
  });
});

app.post('/login', isValidEmail, isValidPassword, (_req, res) => {
  const tokenCreated = createToken(16);
  res.status(200).json({ token: tokenCreated });
});

app.post('/talker', isValidToken, isValidName, isValidAge,
isValidTalk, isValidDate, isValidRate, (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  fs.readFile(talkerJson, 'utf8', (_err, content) => {
    const ONE = 1;
    const data = JSON.parse(content);
    const lastPosition = data[data.length - 1];
    const id = lastPosition.id + ONE;
    // talvez poderei utilizar a estrutura no próximo requisito
    // const findTalker = data.find((talker) => talker.id === Number(id));
    // if (findTalker) {
    //   return res.status(409).json({
    //     message: 'Pessoa palestrante já cadastrada' });
    // }
    const talker = { age, id, name, talk: { watchedAt, rate } };

    data.push(talker);
    fs.writeFile(talkerJson, JSON.stringify(data), 'utf8', () =>
     res.status(201).json({ id, age, name, talk: { watchedAt, rate } }));
  });
});
// fonte para colaboração na realização do post acima < https://www.ti-enxame.com/pt/node.js/como-fazer-um-http-post-pedido-em-node.js/972845785/>
    
//     data.push({ id, name, age, talk: { watchedAt, rate } });
//     return res.status(201).json({ id, name, age, talk: { watchedAt, rate } });     
//   });
// });

app.put('/talker/:id', 
isValidToken, isValidName, isValidAge, isValidTalk, isValidDate, isValidRate, (req, res) => {
  const requireId = req.params.id;
  const id = Number(requireId);
  const { name, age, talk: { watchedAt, rate } } = req.body;
  fs.readFile(talkerJson, 'utf8', (_err, content) => {
    const data = JSON.parse(content);
    const talkerUpdated = { id, name, age, talk: { watchedAt, rate } };
    const index = data.findIndex((talker) => talker.id === Number(id));
    data[index] = talkerUpdated;
    fs.writeFile(talkerJson, JSON.stringify(data), 'utf8', () =>
      res.status(200).json({ id, name, age, talk: { watchedAt, rate } }));
  });
});

app.delete('/talker/:id', isValidToken, (req, res) => {
  const { id } = req.params;
  fs.readFile(talkerJson, 'utf8', (_err, content) => {
    const data = JSON.parse(content);
    const index = data.findIndex((talker) => talker.id === Number(id));
    data.splice(index, 1);
    fs.writeFile(talkerJson, JSON.stringify(data), 'utf8', () =>
      res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' }));
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
