const fs = require('fs');

const file = './talker.json';
const HTTP_OK_STATUS = 200;

const getTalker = async () => {
    const data = fs.readFileSync(file, 'utf8');
    const out = await JSON.parse(data); 
    return out;
  };

const getTalkerID = async (request, response) => {
  const { id } = request.params;
  const data = await getTalker();
  const out = data.find((talker) => talker.id === Number(id));

  if (out === undefined) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return response.status(200)
  .json(out); 
};

const getAll = (_request, response) => {
  const data = getTalker();
  return response.status(HTTP_OK_STATUS).send(data);
};

const tolkenValidate = async (request, response, next) => {
  const token = request.header('Authorization');
  if (!token) return response.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) {
    return response
        .status(401).json({ message: 'Token inválido' }); 
}
  next();
};

const nameValidate = async (request, response, next) => {
  const { name } = request.body;
 
  if (name === undefined) {
    return response
        .status(400).json({ message: 'O campo "name" é obrigatório' }); 
}
  if (name.length < 3) {
    return response
        .status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
}

  next();
};

const talkValidate = (request, response, next) => {
  const { talk } = request.body;
  /* https://stackoverflow.com/questions/6402743/regular-expression-for-mm-dd-yyyy-in-javascript */
  const dataFormat = new
  RegExp('/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/');
  if (!dataFormat.test(talk.watchedAt)) {
    return response
  .status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (talk.rate < 1 && talk.rate > 5) {
    return response
    .status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (talk === undefined) {
    return response
    .status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const ageValidate = (request, response, next) => {
  const { age } = request.body;
  if (!age) {
    return response.status(400).json({
        message: 'O campo "age" é obrigatório',
      }); 
    }
  if (age < 18) {
    return response.status(400).json(
    { message: 'A pessoa palestrante deve ser maior de idade' },
      ); 
}
console.log(age);
  // if (!age) {
  //   return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  // }
  next();
};

const create = async (request, response, _next) => {
  const { name, age, talk } = request.body;
  const talkers = fs.readFileSync(file, 'utf8');
  const talkersJson = await JSON.parse(talkers);
  const id = talkersJson.length + 1;
  console.log(talkersJson);
  const out = [...talkersJson, { id, name, age, talk }];
  const string = JSON.stringify(out);
  // console.log(out);
  fs.writeFile(file, string, (err) => {
    if (err) {
   return response
      .status(404)
      .send(err); 
}
  });
  return response
    .status(201)
    .json({ id, name, age, talk });
};

module.exports = {
  getAll,
  getTalkerID,
  tolkenValidate,
  talkValidate,
  ageValidate,
  nameValidate,
  create,
};
