const fs = require('fs').promises;

const overwriteWriteFile = (fileName, content) => {
  fs.writeFile(fileName, JSON.stringify(content, null, 2));
};

module.exports = overwriteWriteFile;