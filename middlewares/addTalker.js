const HTTP_OK_STATUS = 201;
const NOT_FOUND_STATUS = 401;
const FAIL_STATUS = 400;

const validateToken = (token, res) => {
  if (!token) {
    return res
      .status(NOT_FOUND_STATUS)
      .json({ message: 'Token não encontrado' });
  }
  if (token.length < 16) {
    return res.status(NOT_FOUND_STATUS).json({ message: 'Token inválido' });
  }
};

const validateName = (name, res) => {
  if (!name) {
    return res
      .status(FAIL_STATUS)
      .json({ message: '"O campo "name" é obrigatório"' });
  }
  if (name.length < 3) {
    return res
      .status(FAIL_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const addTalker = (req, res) => {
  // const { token } = req.headers.authorization;
  // const { name, age } = req.body;
  // validateToken(token, res);
  // validateName(name, res);
  // if (!age) {
  // res.status(FAIL_STATUS).json({ message: '"O campo "age" é obrigatório"' });
  // }

  res.status(HTTP_OK_STATUS).json(req.body);
};

module.exports = addTalker;
