// Importação da ramdomBytes para geração de token
const { randomBytes } = require('crypto');

// Objeto com mensagens de erro
const MessagesError = {
  emptyEmail: 'O campo "email" é obrigatório',
  invalidEmail: 'O "email" deve ter o formato "email@email.com"',

  emptyPassword: 'O campo "password" é obrigatório',
  invalidPassword: 'O "password" deve ter pelo menos 6 caracteres',

  emptyToken: 'Token não encontrado',
  invalidToken: 'Token inválido',

  emptyName: 'O campo "name" é obrigatório',
  invalidName: 'O "name" deve ter pelo menos 3 caracteres',

  emptyAge: 'O campo "age" é obrigatório',
  invalidAge: 'A pessoa palestrante deve ser maior de idade',

  emptyTalk: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  invalidTalkWatchedAt: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  invalidTalkRate: 'O campo "rate" deve ser um inteiro de 1 à 5',
};

function validatorEmail(email) {
  // Importação das mensagens de erro
  const { emptyEmail, invalidEmail } = MessagesError;
  // REGEX para teste de email
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Realiza o teste no email informado
  const validEmail = EMAIL_REGEX.test(email);
  // Caso não tenha email ou seja uma string vazia retorna a mensagem de erro
  if (!email || email === '') { return emptyEmail; } 
  // Caso o resultado do test com REGEX seja falso retorna a mensagem de erro
  if (!validEmail) { return invalidEmail; }

  // Retorna o resultado do teste 
  return validEmail;
}

function validatorPassword(password) {
  // Importação das mensagens de erro
  const { emptyPassword, invalidPassword } = MessagesError;
  // Tamanho mínimo do campo password
  const MIN_PASSWORD_LENGTH = 6;
  // Verifica se foi passado o password
  if (!password) { return emptyPassword; }
  // Verifica se o password informado tem o tamanho mínimo
  const validPassword = password.length >= MIN_PASSWORD_LENGTH;
  // Caso password não tenha o tamanho mínimo retorna mensagem de erro
  if (!validPassword) { return invalidPassword; }

  // Retorna o resultado da verificação 
  return validPassword;
}

// Geração de token
function tokenGenerator() {
  // Utiliza a random bytes para gerar um token
  const newtoken = randomBytes(8).toString('hex');
  
  // Retorna o token gerado
  return newtoken;
}

function signupInfo(email, password) {
  const newUserToken = tokenGenerator();
  const newUser = { 
    email, 
    password, 
    token: newUserToken };

  return newUser;
}

// Verifica a validade de um token
function verifyToken(targetToken) {
  // Importação das mensagens de erro
  const { emptyToken, invalidToken } = MessagesError;
  // Tamanho mínimo do token 
  const MIN_TOKEN_LENGTH = 16;
  // Verifica se o token foi passado
  if (!targetToken) { return emptyToken; }
  // Verifica se o token tem o tamanho mínimo
  const tokenExist = targetToken.length >= MIN_TOKEN_LENGTH;
  // Retorna uma mensagem de erro caso o token seja inválido
  if (!tokenExist) { return invalidToken; }

  // Retorna o resultado da verificação
  return tokenExist;
}

// Função para verificar o nome
function validatorName(targetName) {
  // Importação das mensagens de erro
  const { emptyName, invalidName } = MessagesError;
  // Tamanho mínimo do campo nome
  const MIN_NAME_LENGTH = 3;
  // Verifica se foi passado o nome
  if (!targetName) { return emptyName; }
  // Verifica se o nome tem o tamanho mínimo
  const validatedName = targetName.length >= MIN_NAME_LENGTH;
  // Retorna uma mensagem de erro caso o nome seja inválido
  if (!validatedName) { return invalidName; }

  // Retorna o resultado da verificação
  return validatedName;
}

// Função para verificar a idade
function validatorAge(targetAge) {
  // Importação das mensagens de erro
  const { emptyAge, invalidAge } = MessagesError;
  // Valor mínimo da idade 
  const MIN_AGE = 18;
  // Verifica se a idade foi passada
  if (!targetAge) { return emptyAge; }
  // Verifica se a idade tem o valor mínimo
  const validatedAge = Number(targetAge) >= MIN_AGE;
  // Retorna mensagem de erro caso a idade não seja mínima
  if (!validatedAge) { return invalidAge; }

  // Retorna resultado da verificação
  return validatedAge;
}

function verifyPositive(targetNumber) {
  // Constantes com valores mínimos e máximos
  const MIN_VALUE = 1; const MAX_VALUE = 5; 
  // Constante com resultado da verificação
  const result = true;
  // Converte o valor passado para inteiro
  const stringToNumber = parseInt(targetNumber, 10);
  // Verifica se o valor está entre o intervalo pedido
  if (stringToNumber < MIN_VALUE || stringToNumber > MAX_VALUE) { return false; }

  // Retorna o resultado
  return result;
}

// Função para verificar as informações do talk 
function validatorTalkInfo(talkObject) {
  // Importação das mensagens de erro
  const { emptyTalk, invalidTalkWatchedAt, invalidTalkRate } = MessagesError;
  // REGEX para validação de data 
  const DATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/; 

  // Verifica a validade da data
  const validatedWatchedAt = DATE_REGEX.test(talkObject.watchedAt);
  // Verifica se a chave rate é um inteiro
  const validatedRate = verifyPositive(talkObject.rate);

  // Retorna uma mensagem de erro caso watchedAt ou rate seja null 
  if (talkObject.watchedAt == null || talkObject.rate == null) { return emptyTalk; }
  // Retorna uma mensagem de erro caso watchedAt seja inválido
  if (!validatedWatchedAt) { return invalidTalkWatchedAt; }
  // Retorna uma mensagem de erro caso rate seja inválido
  if (!validatedRate) { return invalidTalkRate; }
}

// Função que verifica se os dados estão corretos
function validatorRegistration(targetName, targetAge, talkObject) {
  // Constante para indicar o estado das verificações
  const allValidatedStatus = true;

  // Verifica o name
  const checkName = validatorName(targetName);
  // Verifica a age
  const checkAge = validatorAge(targetAge);
  // Verifica o conteúdo do talk
  const checkTalkContent = validatorTalkInfo(talkObject);

  // Retorna mensagem de erro caso name seja inválido
  if (typeof checkName === 'string') return checkName;
  // Retorna mensagem de erro caso age seja inválido
  if (typeof checkAge === 'string') return checkAge;
  // Retorna mensagem de erro caso talkContent seja inválido
  if (typeof checkTalkContent === 'string') return checkTalkContent;

  return allValidatedStatus; // Retorna resultado das verificações
}

// Função para gerar o objeto no registro de uma pessoa
function generateRegistrationObject(targetName, targetAge, talkObject, id) {
  // Objeto de nova pessoa palestrante 
  const newTalker = {
    name: targetName,
    age: Number(targetAge),
    id: Number(id),
    talk: {
      // eslint-disable-next-line radix
      rate: parseInt(talkObject.rate, 10),
      watchedAt: talkObject.watchedAt,
    },
  };

  // Retorna o objeto
  return newTalker;
}

// Função para registrar uma nova pessoa palestrante
function registration(targetName, targetAge, talkObject, id) {
  // Importação das mensagens de erro
  const { emptyTalk } = MessagesError;
  // Verifica se o talk foi passado e retorna mensagem de erro caso não
  if (!talkObject) { return emptyTalk; }

  // Cria objeto com as informações passadas
  const talker = generateRegistrationObject(targetName, targetAge, talkObject, id);
  // Realiza a verificação das informações passadas
  const validationsResult = validatorRegistration(targetName, targetAge, talkObject);
  // Verifica o resultado das validações e retorna mensagem de erro se ncessário
  if (typeof validationsResult === 'string') { return validationsResult; }

  // Retorna o novo talker
  return talker;
}

// Exportação padrão das funções
module.exports = { 
  validatorEmail, 
  validatorPassword, 
  signupInfo,
  verifyToken,
  registration,
};