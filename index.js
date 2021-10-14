// Importação do express e do body-parser
const express = require('express');
const bodyParser = require('body-parser');

// Importação dos middlewares
const authenticationMiddleware = require('./middlewares/authenticationMiddleware.js');
const searchMiddleware = require('./middlewares/searchMiddleware.js');

// Importação das funçoões de content
const { 
  searchById, 
  updateContentById, 
  deleteContentById, 
} = require('./services/content.js');

// Importação das funções de login
const { 
  validatorEmail, 
  validatorPassword, 
  signupInfo, 
  registration, 
} = require('./services/login.js');

// Importação das funções de readAndWrite
const { 
  handleFileReading, 
  handleFileWriting, 
} = require('./services/readAndWrite.js');

// Inicialização do express
const app = express();
app.use(bodyParser.json());

// Constantes com códigos de resposta HTTP
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_NOT_FOUND_STATUS = 404;

// Porta da APIS
const PORT = '3000';

// Endereço do arquivo JSON
const filePaths = {
  talker: './talker.json',
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1
app.get('/talker', async (_request, response) => {
  // Realiza a leitura do arquivo 
  const contentFromFile = await handleFileReading(filePaths.talker);

  // Caso exista conteúdo no arquivo retorna as pessoas cadastradas
  if (contentFromFile) { return response.status(HTTP_OK_STATUS).json(contentFromFile); }

  // Retorna um array vazio caso não haja pessoas cadastradas
  return response.status(HTTP_OK_STATUS).json([]);
});

// Requisito 7
app.get('/talker/search', authenticationMiddleware, searchMiddleware);

// Requisito 2 
app.get('/talker/:id', async (request, response) => {
  // Pega o id que foi informado na requisição
  const { id } = request.params;

  // Salva as pessoas palestrantes nessa constante
  const talkersDatabase = await handleFileReading(filePaths.talker);
  // Realiza a busca da pessoa palestrante através do id
  const findedTalker = searchById(talkersDatabase, id);
  // Mensagem de erro
  const messageError = { message: 'Pessoa palestrante não encontrada' };

  // Verifica se foi encontrado alguma pessoa
  if (findedTalker) { return response.status(HTTP_OK_STATUS).json(findedTalker); }

  // Caso não seja encontrado ninguém com o id informado
  return response.status(HTTP_NOT_FOUND_STATUS).json(messageError);
});

// Requisito 3
app.post('/login', async (request, response) => {
  // Pega o email e o password informado na requisição
  const { email, password } = request.body; 

  const validateEmail = validatorEmail(email); // Validação de email
  
  const validatePassword = validatorPassword(password); // Validação de password

  if (validateEmail !== true) { // Mensagem caso o email não seja válido
    return response.status(HTTP_BAD_REQUEST_STATUS).json({ message: validateEmail });
  }

  if (validatePassword !== true) { // Mensagem caso o password não seja válido
    return response.status(HTTP_BAD_REQUEST_STATUS).json({ message: validatePassword });
  }

  const getToken = signupInfo(email, password); // Passa as informações de login para gerar um token
  return response.status(HTTP_OK_STATUS).json({ token: getToken.token }); // Retorna o token gerado
});

// Requisito 4
app.use(authenticationMiddleware);

app.post('/talker', async (request, response) => {
  const { name, age, talk } = request.body; // Pega o nome, idade e palestra da requisição

  const currentFileContent = await handleFileReading(filePaths.talker); // Realiza a leitura do conteúdo do arquivo
  const id = currentFileContent.length + 1; // Cria o o id para a nova pessoa palestrante

  const validatedTalkerData = registration(name, age, talk, id); // Valida os dados informados

  if (typeof validatedTalkerData === 'string') { // Verifica se o resultado da validação é uma mensagem de erro
    return response.status(HTTP_BAD_REQUEST_STATUS).json({ message: validatedTalkerData }); // Retorna a mensagem
  }

  currentFileContent.push(validatedTalkerData); // Insere o novo palestrante junto aos demais
  await handleFileWriting(filePaths.talker, currentFileContent); // Escreve no arquivo as mudanças
  return response.status(HTTP_CREATED_STATUS).json(validatedTalkerData); // Retorna o novo palestrante
});

// Requisito 5
app.put('/talker/:id', async (request, response) => {
  const { name, age, talk } = request.body; // Pega as novas informações passadas na requisição
 
  const { id } = request.params; // Pega o id informado na URL

  const validatedTalkerData = registration(name, age, talk, id); // Valida as novas informações

  if (typeof validatedTalkerData === 'string') { // Verifica se o retorno é uma string com mensagem de erro
    return response.status(HTTP_BAD_REQUEST_STATUS).json({ message: validatedTalkerData }); // Retorna o erro
  }

  const currentFileContent = await handleFileReading(filePaths.talker); // Realiza a leitura do arquivo atual
  const newContent = updateContentById(currentFileContent, id); // Filtra somente o que não será atualizado
  const updatedTalker = { name, age: Number(age), id: Number(id), talk }; // Cria o objeto com o participante atualizado

  newContent.push(updatedTalker); // Insere o participante atualizado junto com os outros
  await handleFileWriting(filePaths.talker, newContent); // Escreve no arquivo a alteração

  return response.status(HTTP_OK_STATUS).json(updatedTalker); // Retorna o participante atualizado
});

// Requisito 6
app.delete('/talker/:id', async (request, response) => {
  const { id } = request.params; // Pega o id informado na URL

    const currentFileContent = await handleFileReading(filePaths.talker); // Realiza a leitura do conteúdo do arquivo
    const deletionResults = deleteContentById(currentFileContent, id); // Deleta a pessoa com o id informado ou retorna erro 
    const newContent = deletionResults.content; // Constante com o contéudo atualizado
    const successMessage = deletionResults.message; // Constante com a mensagem de sucesso

    await handleFileWriting(filePaths.talker, newContent); // Escreve as alterações no arquivo

    return response.status(HTTP_OK_STATUS).json({ message: successMessage }); // Retorna a mensagem de sucesso
});

// Inicialização do funcionamento da API na porta 3000
app.listen(PORT, () => {
  console.log(`Servidor online na porta: ${PORT}`);
});
