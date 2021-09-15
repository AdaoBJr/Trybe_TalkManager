module.exports = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let index = 0; index < 16; index += 1) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return { token: result };
};

// fonte: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
