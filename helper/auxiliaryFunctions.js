const fs = require('fs').promises;
const { HTTP_OK_STATUS, HTTP_CREATED, HTTP_NOT_FOUND } = require('./httpStatus');

const talkerJson = 'talker.json';

const readingFile = async () => {
  const talkerFile = await fs.readFile(talkerJson, 'utf-8');
  const convertToJson = JSON.parse(talkerFile);

  return convertToJson;
};

const overwriting = (oldFile, newContent, callBack) => {
  const writeFile = fs.writeFile(oldFile, newContent);

  return writeFile.then(callBack);
};

const searchTerm = async (request, response) => {
  const { name } = request.params;
  const readFile = await readingFile();

  const filteredByName = readFile.findIndex((el) => el.name === name);

  if (name === '' || !name) {
    return response.status(HTTP_OK_STATUS).json(readFile);
  }

  if (filteredByName === -1) {
    return response.status(HTTP_OK_STATUS).json([]);
  }
  
  return response.status(HTTP_OK_STATUS).json(filteredByName);
};

const getTalkers = async (_request, response) => {
  const readFile = await readingFile();

  if (readFile === null) return response.status(HTTP_OK_STATUS).json([]);

  return response.status(HTTP_OK_STATUS).json(readFile);
};

const getTalkerById = async (request, response) => {
  const { id } = request.params;
  const readFile = await readingFile();
  const getById = readFile.find((talker) => talker.id === parseInt(id, 10));

  if (!getById) {
    return response.status(HTTP_NOT_FOUND)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  
  return response.status(HTTP_OK_STATUS).json(getById);
};

const sendLogin = (_request, response) => {
  const token = Math.random().toString(16).substr(2, 8) + Math.random().toString(16).substr(2, 8);

  return response.status(HTTP_OK_STATUS).json({ token });
};

const createTalker = async (request, response) => {
  const { name, age, talk } = request.body;
  const readFile = await readingFile();

  const lastId = readFile.length;
  const newRegister = {
    id: lastId + 1,
    name,
    age,
    talk,
  };
  
  readFile.push(newRegister);
  const jsonString = JSON.stringify(readFile);

  overwriting(talkerJson, jsonString, () => response.status(HTTP_CREATED).json(newRegister));
};

const editTalker = async (request, response) => {
  const { name, age, talk } = request.body;
  const { id } = request.params;
  const readFile = await readingFile();

  const filteredList = readFile.filter((el) => parseInt(el.id, 10) !== parseInt(id, 10));
  const updateTalker = {
    id: parseInt(id, 10),
    name,
    age,
    talk,
  };

  filteredList.push(updateTalker);
  const jsonString = JSON.stringify(filteredList);

  overwriting(talkerJson, jsonString, () => response.status(HTTP_OK_STATUS).json(updateTalker));
};

const deleteTalker = async (request, response) => {
  const { id } = request.params;
  const readFile = await readingFile();

  const talkerIndex = readFile.findIndex((el) => parseInt(el.id, 10) === parseInt(id, 10));

  readFile.splice(talkerIndex, 1);
  const jsonString = JSON.stringify(readFile);

  overwriting(talkerJson, jsonString, () => response.status(HTTP_OK_STATUS)
    .json({ message: 'Pessoa palestrante deletada com sucesso' }));
};

module.exports = {
  searchTerm,
  getTalkers,
  getTalkerById,
  sendLogin,
  createTalker,
  editTalker,
  deleteTalker,
};
