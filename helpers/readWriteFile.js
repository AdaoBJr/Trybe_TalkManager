const fs = require('fs').promises;

const readContentFile = async (path) => {
  try {
    const content = await fs.readFile(path, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
};

const writeContentFile = async (path, content) => {
  try {
    const contentFile = await readContentFile(path);
    contentFile.push(content);
    await fs.writeFile(path, JSON.stringify(contentFile));

    return content;
  } catch (error) {
    return null;
  }
};

module.exports = { readContentFile, writeContentFile };
