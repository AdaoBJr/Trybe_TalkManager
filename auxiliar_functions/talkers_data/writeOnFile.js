const { writeFile } = require('fs').promises;

const writeOnFile = async (file, data) => {
  await writeFile(file, data, (err) => {
    if (err) throw err;

    return 'talker criado com sucesso!';
  });
};

module.exports = writeOnFile;
