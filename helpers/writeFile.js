const fs = require('fs').promises;

// Obrigado pela dica, Vinícius ;)
const overwriteWriteFile = async (fileName, content) => fs
.writeFile(fileName, JSON.stringify(content, null, 2));

module.exports = overwriteWriteFile;