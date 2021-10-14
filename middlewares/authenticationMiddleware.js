// Importação da função verifyToken
const { verifyToken } = require('../services/login');

// Constante com código de resposta HTTP
const HTTP_UNAUTHORIZED_STATUS = 401;

async function authenticationMiddleware(request, response, next) {
  // Pega o token informado no header da requisição
  const token = request.headers.authorization;
  // Verifica se o token é válido
  const validateToken = verifyToken(token);

  // Verifica a resposta da validade do token
  if (validateToken !== true) { 
    // Retorna mensagem e código de não autorizado
    return response.status(HTTP_UNAUTHORIZED_STATUS).json({ message: validateToken }); 
  }
  
  // Próximo passo
  next();
}

// Exportação padrão
module.exports = authenticationMiddleware;