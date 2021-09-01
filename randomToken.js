// fonte: https://gist.github.com/6174/6062387

function generateToken(length) {
  const radom13chars = () => Math.random().toString(16).substring(2, 15);
  const loops = Math.ceil(length / 13);
    return new Array(loops).fill(radom13chars)
      .reduce((string, func) => string + func(), '').substring(0, length);
}

// console.log(generateToken(16));
// ex: "cd8ef5e062c58a80"

module.exports = { generateToken };