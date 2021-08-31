const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});



//desafio7
app.get('/talker/search', async (req, res) => {
  const { headers: {token}, query: { q } } = req;

  if(!token) {
    return res.status(401).json({message: "Token não encontrado"})
  }

  const tokenIsValid = 16;
  if(token <= tokenIsValid) {
    return res.status(401).json({message: "Token inválido"});
  }

  const response = await fs.readFile('./talker.json', 'utf-8');
  const convert = JSON.parse(response);

  const filterQuery = convert.filter(cur => cur.name.includes(q))
  if(filterQuery) {
    console.log('if 1')
    return res.status(200).json(filterQuery)
  }

  if(!q) {
    console.log('if 2')
    return res.status(200).json(response);
  }

  if(!filterQuery) {
    console.log('if 3')
    return res.status(200).json([]);
  }

})

// desafio 1
const palestrantes =  async (_req, res) => {
  const response = await fs.readFile('./talker.json', 'utf-8');
  const data = JSON.parse(response);
  
  if(!data) {
    return res.status(200).json({ data: [] })
  }
  
  return res.status(200).json(data);
}
app.get('/talker', palestrantes);

//desafio2
app.get('/talker/:id', async (req, res) => {
  const {id} = req.params;
  const response = await fs.readFile('./talker.json', 'utf-8');
  const convert = JSON.parse(response);
  const data = convert.find(cur => cur.id === Number(id));
  
  return res.json(data);
});

//desafio3
app.post('/loguin', (req, res) => {
  const { email, password } = req.body;
  
  // source for function random token: https://www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/
  function generate_token(length){
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
  } 
  const token = generate_token(16);

  const emailIsValid = email.match(/((\w+)@(\w+)\.(\w+))/i)
  const passwordLength = 6;

  if(!email || email === "") {
    return res.status(400).json({message: "O campo \"email\" é obrigatório"})
  }

  if(!emailIsValid) {
    return res.status(400).json({message: "O \"email\" deve ter o formato \"email@email.com\""})
  }

  if(!password || password === "") {
    return res.status(400).json({ message: "O campo \"password\" é obrigatório" })
  }

  if(!passwordLength) {
    return res.status(400).json({ message: "O \"password\" deve ter pelo menos 6 caracteres" })
  }

  return res.status(200).json({token})

})


//desafio4
app.post('/talker', async (req, res) => {
  const { headers: { token }, body: { name, age, talk: { watchedAt, rate } } } = req;

  if(!token) {
    return res.status(401).json({message: "Token não encontrado"})
  }

  const tokenIsValid = 16;
  if(token <= tokenIsValid) {
    return res.status(401).json({message: "Token inválido"});
  }


  if(!name || name === "") {
    return res.status(400).json({message: "O campo \"name\" é obrigatório"})
  }

  const nameIsValid = 3;
  if(name <= nameIsValid) {
    return res.status(400).json({message: "O \"name\" deve ter pelo menos 3 caracteres"})
  }

  if(!age || age === "") {
    return res.status(400).json({message: "O campo \"age\" é obrigatório"})
  }

  const ageIsValid = 18;
  if(age <= ageIsValid) {
    return res.status(400).json({message: "A pessoa palestrante deve ser maior de idade"})
  }

  const dataIsValid = /^([0-2][1-9]|(3)[0-1])(\/)(((0)[1-9])|((1)[0-2]))(\/)\d{4}$/i;
  if(watchedAt === dataIsValid) {
    return res.status(400).json({message: "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""})
  }

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!watchedAt || !rate) {
    return res.status(400).json({message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'});
  }

  const response = await fs.readFile('./talker.json', 'utf-8');
  const convert = JSON.parse(response);

  const newPalester = {
    id: convert.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate
    }
  }

  // const post = convert.filter((cur) => cur.id !== Number(id));
  convert.push(newPalester);
  await fs.writeFile('./talker.json', JSON.stringify(convert));

  return res.status(200).json(newPalester);

});

//desafio5
app.put('/talker/:id', async (req, res) => {
  const { params: { id }, headers: { token }, body: { name, age, talk: { watchedAt, rate } } } = req;

  if(!token) {
    return res.status(401).json({message: "Token não encontrado"})
  }

  const tokenIsValid = 16;
  if(token <= tokenIsValid) {
    return res.status(401).json({message: "Token inválido"});
  }


  if(!name || name === "") {
    return res.status(400).json({message: "O campo \"name\" é obrigatório"})
  }

  const nameIsValid = 3;
  if(name <= nameIsValid) {
    return res.status(400).json({message: "O \"name\" deve ter pelo menos 3 caracteres"})
  }

  if(!age || age === "") {
    return res.status(400).json({message: "O campo \"age\" é obrigatório"})
  }

  const ageIsValid = 18;
  if(age <= ageIsValid) {
    return res.status(400).json({message: "A pessoa palestrante deve ser maior de idade"})
  }

  const dataIsValid = /^([0-2][1-9]|(3)[0-1])(\/)(((0)[1-9])|((1)[0-2]))(\/)\d{4}$/i;
  if(watchedAt === dataIsValid) {
    return res.status(400).json({message: "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""})
  }

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!watchedAt || !rate) {
    return res.status(400).json({message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'});
  }

  const response = await fs.readFile('./talker.json', 'utf-8');
  const convert = JSON.parse(response);

  const newPalester = {
    id: +id,
    name,
    age,
    talk: {
      watchedAt,
      rate
    }
  }

  const put = convert.filter((cur) => cur.id !== Number(id));
  put.push(newPalester);
  await fs.writeFile('./talker.json', JSON.stringify(put));

  return res.status(200).json(newPalester);

});

//desafio6
app.delete('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const response = await fs.readFile('./talker.json', 'utf-8');
  const convert = JSON.parse(response);
  const newList = convert.filter((talker) => talker.id !== Number(id));
  await fs.writeFile('talker.json', JSON.stringify(newList));
  return res.status(200).json({ message: "Pessoa palestrante deletada com sucesso" });
})



app.listen(PORT, () => {
  console.log('Online');
});
