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

const getAll = async (_request, response) => {
  const data = await getTalker();
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

const watchedValidate = (request, response, next) => {
  const { talk } = request.body;
  if (talk === undefined || talk.watchedAt === undefined || talk.rate === undefined) {
      return response
      .status(400)
      .json({ 
          message: 
          'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
};

const dateValidate = (request, response, next) => {
  const { talk } = request.body;
  // https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
  const dataFormat = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/;
  if (!dataFormat.test(talk.watchedAt)) {
      return response
              .status(400)
              .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const rateValidate = (request, response, next) => {
  const { talk } = request.body;
  if (talk.rate < 1 || talk.rate > 5) {
      return response
      .status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
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
  next();
};

const writefile = (response, fileUrl, string) => {
  fs.writeFile(fileUrl, string, (err) => {
    if (err) {
      return 'fail';
}
  });
};

const create = async (request, response, _next) => {
  const { name, age, talk } = request.body;
  const talkers = fs.readFileSync(file, 'utf8');
  const talkersJson = await JSON.parse(talkers);
  const id = talkersJson.length + 1;
  const out = [...talkersJson, { id, name, age, talk }];
  const string = JSON.stringify(out);
  writefile(response, file, string);
  return response
    .status(201)
    .send({ id: Number(id), name, age, talk });
};

const edit = async (request, response, _next) => {
  const { id } = request.params;
  const { name, age, talk } = request.body;
  const data = await getTalker();
  const index = data.findIndex((talker) => talker.id === Number(id));
  const talkers = fs.readFileSync(file, 'utf8');
  const talkersJson = await JSON.parse(talkers);
  talkersJson[index] = { id: Number(id), name, age, talk };
  const string = JSON.stringify(talkersJson);
  writefile(file, string);
  return response
    .status(200)
    .json({ id: Number(id), name, age, talk });
};

const deleteTalker = async (request, response, _next) => {
  const { id } = request.params;
  const talkers = fs.readFileSync(file, 'utf8');
  const data = await JSON.parse(talkers);
  const out = data.filter((talker) => talker.id !== Number(id));
  const deleted = JSON.stringify(out);
  writefile(response, file, deleted);
  return response
    .status(200)
    .json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = {
  getAll,
  getTalkerID,
  tolkenValidate,
  watchedValidate,
  dateValidate,
  rateValidate,
  ageValidate,
  nameValidate,
  create,
  edit,
  deleteTalker,
};
