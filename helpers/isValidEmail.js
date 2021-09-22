const HTTP_400_STATUS = 400;
const REGEX_EMAIL = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
const EMAIL_IS_REQUIRED = { message: 'O campo "email" é obrigatório' };
const INVALID_EMAIL = { message: 'O "email" deve ter o formato "email@email.com"' };

const isValidEmail = (request, response, next) => {
  const { email } = request.body;
  if (!email) {
    return response.status(HTTP_400_STATUS).json(EMAIL_IS_REQUIRED);
  }
  if (!REGEX_EMAIL.test(email)) {
    return response.status(HTTP_400_STATUS).json(INVALID_EMAIL);
  }
  next();
};

module.exports = isValidEmail;
