const getTalkers = require('./getTalker');
const getId = require('./getId');
const verificateLogin = require('./validates/verificateLogin');
const addNewTalker = require('./postTalker');
const validateToken = require('./validates/validateToken');
const validateName = require('./validates/validateName');
const validateAge = require('./validates/validateAge');
const validateDate = require('./validates/validateTalk');
const validateRate = require('./validates/validateTalk');
const validateTalk = require('./validates/validateTalk');

module.exports = { 
getTalkers,
getId,
verificateLogin,
validateToken,
validateName,
validateAge,
validateDate,
validateRate,
validateTalk,
addNewTalker,
};
