const fsPromise = require('fs').promises;

const appendFile = async (file, info) => {
 const response = await fsPromise.appendFile(file, info, (err) => {
   if (err) throw err;

   return response;
 }, 'utf-8');
};

module.exports = appendFile;
