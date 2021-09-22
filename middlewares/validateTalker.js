// const { StatusCodes: { BAD_REQUEST, UNAUTHORIZED } } = require('http-status-codes');

// const validateToken = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(UNAUTHORIZED)
//               .json({ message: 'Token não encontrado' });
//   }
//   if (!authorization.length !== 16) {
//     return res.status(UNAUTHORIZED)
//               .json({ message: 'Token inválido"' });
//   }
//   next();
// };

// const validateName = (req, res, next) => {
//   const { name } = req.body;

//   if (!name) {
//     return res.status(BAD_REQUEST)
//               .json({ message: 'O campo "name" é obrigatório' });
//   }
//   if (!name.length < 3) {
//     return res.status(BAD_REQUEST)
//               .json({ message: 'O "name" deve ter pelo menos 3 caracteres"' });
//   }
//   next();
// };

// const validateAge = (req, res, next) => {
//   const { age } = req.body;

//   if (!age) {
//     return res.status(BAD_REQUEST)
//               .json({ message: 'O campo "age" é obrigatório' });
//   }
//   if (parseInt(age, 10) < 18) {
//     return res.status(BAD_REQUEST)
//               .json({ message: 'A pessoa palestrante deve ser maior de idade' });
//   }
//   next();
// };

// const validateTalk = (req, res, next) => {
//   const { talk } = req.body;

//   if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
//     return res.status(BAD_REQUEST)
//               .json({ 
//                 message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
//               });
//   }
//   next();
// };

// const validateWatchedAt = (req, res, next) => {
//   const { talk: { watchedAt } } = req.body;
//   const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; // https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy-with-leap-year-support

//   if (!dateRegex.test(watchedAt)) {
//     return res.status(BAD_REQUEST)
//               .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
//   }
//   next();
// };

// const validateRate = (req, res, next) => {
//   const { talk: { rate } } = req.body;

//   if (rate < 1 || rate > 5) {
//     return res.status(BAD_REQUEST)
//               .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
//   }
//   next();
// };

// const validateTalker = [
//   validateAge,
//   validateName,
//   validateRate,
//   validateTalk,
//   validateToken,
//   validateWatchedAt
// ];

// module.exports = validateTalker;
