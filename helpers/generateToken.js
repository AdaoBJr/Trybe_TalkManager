const returnChar = () => {
  const letters = 'qwertyuiopasdfghjklçzxcvbnmQWERTYUIOPASDFGHJKLÇZXCVBNM';
  return letters[Math.round(Math.random() * (letters.length - 1))];
};

const returnNumber = () => (Math.floor(Math.random() * 9));

const generateToken = () => {
  let token = '';

  for (let x = 0; x < 16; x += 1) {
    const numberOrLetter = Math.round(Math.random());
    if (numberOrLetter === 1) {
      token += String(returnNumber());
    } else {
      token += String(returnChar());
    }
  }
  return token;
};

module.exports = generateToken;