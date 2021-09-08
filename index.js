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

app.listen(PORT, () => {
  console.log('Online');
});

/*
  1 - Crie o endpoint GET /talker:

  - O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas. Devendo retornar o status 200
  - Caso não exista nenhuma pessoa palestrante cadastrada o endpoint deve retornar um array vazio e o status 200.

*/

/*
  2 - Crie o endpoint GET /talker/:id

  - O endpoint deve retornar uma pessoa palestrante com base no id da rota. Devendo retornar o status 200 ao fazer uma requisição /talker/1
  - Caso não seja encontrada uma pessoa palestrante com base no id da rota, o endpoint deve retornar o status 404
*/

/*
  3 - Crie o endpoint POST /login

  - O endpoint deve ser capaz de retornar um token aleatório de 16 caracteres que deverá ser utilizado nas demais requisições.
    > O endpoint deverá retornar um código de status 200 com o token gerado
  - O campo email deverá ser um email válido. Ele é obrigatório.
    > Caso o campo não seja passado ou esteja vazio retorne um código de status 400
    > Caso o email passado não seja um email válido retorne um código de status 400
  - O campo password deverá ter pelo menos 6 caracteres.
    > Caso o campo não seja passado ou esteja vazio retorne um código de status 400
    > Caso a senha não tenha pelo menos 6 caracteres retorne um código de status 400

*/

/*
  4 - Crie o endpoint POST /talker
  O endpoint deve ser capaz de adicionar uma nova pessoa palestrante ao seu arquivo;

  - A requisição deve ter o token de autenticação nos headers.
    > Caso o token não seja encontrado retorne um código de status 401
    > Caso o token seja inválido retorne um código de status 401
  - O campo name deverá ter no mínimo 3 caracteres. Ele é obrigatório.
    > Caso o campo não seja passado ou esteja vazio retorne um código de status 400
    > Caso o nome não tenha pelo menos 3 caracteres retorne um código de status 400
  - O campo age deverá ser um inteiro e apenas pessoas maiores de idade (pelo menos 18 anos) podem ser cadastrados. Ele é obrigatório.
      > Caso o campo não seja passado ou esteja vazio retorne um código de status 400
      > Caso a pessoa palestrante não tenha pelo menos 18 anos retorne status 400
  - O campo talk deverá ser um objeto com as seguintes chaves:
    > A chave watchedAt deve ser uma data no formato dd/mm/aaaa.
    > Caso a data não respeito o formato dd/mm/aaaa retorne status 400
  - A chave rate deve ser um inteiro de 1 à 5.
    > Caso a nota não seja um inteiro de 1 à 5 retorne status 400
  - O campo talk é obrigatório e nenhuma das chaves citadas anteriormente podem ser vazias.
    > Caso o campo não seja informado, esteja vazio ou então alguma de suas chaves não tenham sido informadas retorne status 400
    > Caso esteja tudo certo, retorne o status 201 e a pessoa cadastrada.
  - O endpoint deve retornar o status 201 e a pessoa palestrante que foi cadastrada

*/

/*
  5 - Crie o endpoint PUT /talker/:id
  O endpoint deve ser capaz de editar uma pessoa palestrante com base no id da rota, sem alterar o id registrado.

  - A requisição deve ter o token de autenticação nos headers.
      > Caso o token não seja encontrado retorne um código de status 401
      > Caso o token seja inválido retorne um código de status 401
  - O campo name deverá ter no mínimo 3 caracteres. Ele é obrigatório.
      > Caso o campo não seja passado ou esteja vazio retorne um código de status 400
      > Caso o nome não tenha pelo menos 3 caracteres retorne um código de status 400
  - O campo age deverá ser um inteiro e apenas pessoas maiores de idade (pelo menos 18 anos) podem ser cadastrados. Ele é obrigatório.
      > Caso o campo não seja passado ou esteja vazio retorne um código de status 400
      > Caso a pessoa palestrante não tenha pelo menos 18 anos retorne status 400
  - O campo talk deverá ser um objeto com as seguintes chaves:
  - A chave watchedAt deve ser uma data no formato dd/mm/aaaa.
      > Caso a data não respeito o formato dd/mm/aaaa retorne status 400
  - A chave rate deve ser um inteiro de 1 à 5.
      > Caso a nota não seja um inteiro de 1 à 5 retorne status 400
  - O campo talk é obrigatório e nenhuma das chaves citadas anteriormente podem ser vazias.
      > Caso o campo não seja informado, esteja vazio ou então alguma de suas chaves não tenham sido informadas retorne status 400
      > Caso esteja tudo certo, retorne o status 200 e a pessoa editada.
  - O endpoint deve retornar o status 200 e a pessoa palestrante que foi editada
*/

/*

  6 - Crie o endpoint DELETE /talker/:id

  - A requisição deve ter o token de autenticação nos headers.
    > Caso o token não seja encontrado retorne um código de status 401
    > Caso o token seja inválido retorne um código de status 401
  - O endpoint deve deletar uma pessoa palestrante com base no id da rota. Devendo retornar o status 200
*/

/*
  7 - Crie o endpoint GET /talker/search?q=searchTerm

  - O endpoint deve retornar um array de palestrantes que contenham em seu nome o termo pesquisado no queryParam da URL. Devendo retornar o status 200
  - A requisição deve ter o token de autenticação nos headers.
    > Caso o token não seja encontrado retorne um código de status 401
    > Caso o token seja inválido retorne um código de status 401
    > Caso searchTerm não seja informado ou esteja vazio, o endpoint deverá retornar um array com todos as pessoas palestrantes cadastradas, assim como no endpoint GET /talker, com um status 200.
    > Caso nenhuma pessoa palestrante satisfaça a busca, o endpoint deve retornar o status 200 e um array vazio.

-- Dica: é importante ter atenção se essa rota não entra em conflito com as outras, já que a ordem das rotas faz diferença na interpretação da aplicação
*/
