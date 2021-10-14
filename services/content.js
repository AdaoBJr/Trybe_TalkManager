// Busca uma pessoa palestrante pelo id
function searchById(database, targetId) {
  // Converte o id passado para número
  const stringToNumber = Number(targetId);
  // Busca na lista de pessoas a que tem o id correspondente
  const findResult = database.find(({ id }) => id === stringToNumber);

  // Retorna o resultado da busca
  return findResult;
}

// Busca uma pessoa palestrante pelo nome
function searchByName(database, targetName) {
  // Formata a palavra passada para string em minúsculo
  const formatString = String(targetName).toLowerCase();
  // Filtra os palestrantes de acordo com a correspondência de nome
  const filteredResults = database.filter(({ name }) => name.toLowerCase().includes(formatString));

  // Retorna o resultado da busca
  return filteredResults;
}

// Edita uma pessoa palestrante através do id 
function updateContentById(database, targetId) {
  // Converte o id passado para número
  const stringToNumber = Number(targetId);
  // Filtra todas as pessoas exceto a que será atualizada
  const updatedContent = database.filter(({ id }) => Number(id) !== stringToNumber);

  // Retorna as pessoas
  return updatedContent;
}

// Verifica se existe alguém com o id informado
function checkContentExistence(database, targetId) {
  // Converte o id passado para número
  const stringToNumber = Number(targetId);
  // Verifica se pelo menos uma pessoa palestrante tem o id informado
  const result = database.some(({ id }) => Number(id) === stringToNumber);

  // Retorna o resultado
  return result;
}

// Deleta o palestrante pelo id informado
function deleteContentById(database, targetId) {
  const checkContent = checkContentExistence(database, targetId); // Verifica se existe esse id no BD

  if (!checkContent) { // Verifica o resultado da busca do id no BD
    const deletedResult = { // Cria objeto mensagem de erro
      message: `O id ${targetId} não existe no banco de dados`,
    };
   
    return deletedResult; // Retorna a mensagem
  }

  const deleteContentFromId = updateContentById(database, targetId); // Recebe todas as pessoas exceto quem será apagado
  const deletedResult = { // Cria objeto com as pessoas e a mensagem de sucesso
    content: deleteContentFromId,
    message: 'Pessoa palestrante deletada com sucesso',
  };

  return deletedResult; // Retorna objeto
}

// Exportação das funções
module.exports = { 
  searchById, 
  searchByName, 
  updateContentById, 
  deleteContentById, 
};
