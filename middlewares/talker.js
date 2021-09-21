// Crie o endpoint GET `/talker`
 
const fs = require('fs').promises;

const result = async function getTalkerById(id) {
  const content = await fs.readFile('talker.json', 'utf-8')

  .then((data) => JSON.parse(data));

  const talker = content.find((i) => i.id === parseInt(id, 10));

  return talker;
};

module.exports = result;

// const express = require('express');

// const app = express(); // 1

// app.get('/hello', handleHelloWorldRequest); // 2

// app.listen(3000, () => {
//   console.log('Aplicação ouvindo na porta 3000');
// }); // 3

// function handleHelloWorldRequest(req, res) {
//   res.status(200).send('Live long and prosper, World!'); // 4
// }

// const result = async function getTalkerById(id) {
//   const content = await fs.readFile('talker.json', 'utf-8')
//   .then((data) => JSON.parse(data));

//   const talker = content.find((i) => i.id === parseInt(id, 10));

//   return talker;
// };
