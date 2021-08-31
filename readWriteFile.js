const fs = require('fs').promises;

const PATH = './talker.json';

const readContentFile = async () => {
  try {
    const content = await fs.readFile(PATH, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
};

const writeContentFile = async (content) => {
  try {
    const arrContent = await readContentFile();
    const newId = arrContent.length + 1;
    const newContent = {
      id: newId,
      ...content,
    };
    arrContent.push(newContent);
    await fs.writeFile(PATH, JSON.stringify(arrContent));
    return newContent;
  } catch (error) {
    return null;
  }
};

const editContentFile = async (id, data) => {
  try {
    const parsedId = parseInt(id, 10);
    const arrContent = await readContentFile();
    const newContent = {
      id: parsedId,
      ...data,
    };
    const index = arrContent.findIndex((entry) => entry.id === parsedId);
    arrContent[index] = newContent;
    await fs.writeFile(PATH, JSON.stringify(arrContent));
    return newContent;
  } catch (error) {
    return null;
  }
};

const deleteContentFile = async (id) => {
  try {
    const parsedId = parseInt(id, 10);
    const arrContent = await readContentFile();
    const index = arrContent.findIndex((entry) => entry.id === parsedId);
    arrContent.splice(index, 1);
    await fs.writeFile(PATH, JSON.stringify(arrContent));
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  editContentFile,
  deleteContentFile,
  readContentFile,
  writeContentFile,
};