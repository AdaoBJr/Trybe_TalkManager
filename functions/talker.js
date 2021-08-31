const fs = require('fs').promises;

async function readFileTalker() {
  try {
    const file = await fs.readFile('./talker.json', 'utf8');
    const result = await JSON.parse(file);
    return result;
  } catch (err) {
     return console.log(err);
  }
}

async function setFile(newUser) {
  try {
    const file = await readFileTalker();
    const newID = file.length + 1;
    
    const newUserWithID = {
      id: newID,
      ...newUser,
    };
  
    file.push(newUserWithID);
    await fs.writeFile('./talker.json', JSON.stringify(file));

    return newUserWithID;
  } catch (error) {
    console.log('Erro ao escrever no arquivo');
  }
}

async function editFile(id, user) {
  try {
    const file = await readFileTalker();
    const talker = {
      id: Number(id),
      ...user,
    };

    const indexTalker = file.findIndex((item) => Number(id) === item.id);

    file[indexTalker] = talker;
    await fs.writeFile('./talker.json', JSON.stringify(file));

    return talker;
  } catch (err) {
    console.log('Erro ao editar no arquivo');
  }
}

module.exports = {
  readFileTalker,
  setFile,
  editFile,
};