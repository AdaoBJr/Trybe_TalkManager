const fsPromise = require('fs').promises;

const readFile = (file) => {
 const requisition = fsPromise.readFile(file, 'utf-8')
  .then((response) => JSON.parse(response))
  .catch((error) => error);

 return requisition;
};

module.exports = readFile;
