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

module.exports = {
  readFileTalker,
  setFile,
};