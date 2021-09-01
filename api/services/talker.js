const fs = require('fs').promises;

const DD_MM_AAAA = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
// reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test

const readFileTalker = async () => {
  try {
    const file = await fs.readFile('./talker.json', 'utf-8');
    return JSON.parse(file);
  } catch (error) {
    console.log(error.message);
  }
};

// thanks for the tip, Raphael Gumieri ;)
const idGenerator = async () => {
  const file = await readFileTalker();
  return file.length + 1;
};

const writeFile = async (path, content) => {
  try {
    fs.writeFile(path, JSON.stringify(content));
  } catch (error) {
    console.log(error.message);
  }
};

const dateFormatValidation = (date) => DD_MM_AAAA.test(date);

module.exports = {
  readFileTalker,
  idGenerator,
  writeFile,
  dateFormatValidation,
};
