const fs = require('fs').promises;

const talker = async () => {
  const result = await fs.readFile('./talker.json', 'utf8');
  return JSON.parse(result);
};

// const writeFile = async (addPalestrate) => {
//   const result = await writeFile(talker,JSON.parse(addPalestrate))
// }
module.exports = talker;