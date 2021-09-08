const containEmail = async (request, response, next) => {
    const { email } = request.body;
    if (email === '' || !email) {
      return response
      .status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    next();
  };

const formatEmail = async (request, response, next) => {
const { email } = request.body;
const parseEmail = /\b[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}\b/i;
if (!parseEmail.test(email)) {
    return response
        .status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
}
next();
};

const containPass = async (request, response, next) => {
const { password } = request.body;
if (password === '' || !password) {
    return response.status(400)
    .json({ message: 'O campo "password" é obrigatório' });
    }
    next();
};

const formatPass = async (request, response, next) => {
    const { password } = request.body;
    if (password.length < 6) {
        return response.status(400).json({
            message: 'O "password" deve ter pelo menos 6 caracteres',
        });
        }
    next();
};

module.exports = { containEmail, containPass, formatEmail, formatPass };

