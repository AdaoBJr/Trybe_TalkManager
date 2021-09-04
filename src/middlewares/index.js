import fs from 'fs';
import {
  generateToken, validateEmail, validatePwd, validateToken, validateTalker } from '../services';

// --------------------------------------------------------------------------------------------

// REQUISITO 1 -- GET ALL TALKERS
export const getAllTalkers = (_req, res) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));

  if (talkers.length > 0) { return res.status(200).json(talkers); }
  if (talkers.length === 0) { return res.status(200).json([]); }
};

// --------------------------------------------------------------------------------------------

// REQUISITO 2 -- GET TALKERS BY ID
export const getTalkersById = (req, res) => {
  const { id } = req.params;

  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));

  const talker = talkers.find((person) => person.id === +id);

  if (talker) { return res.status(200).json(talker); }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

// -------------------------------------------------------------------------------------------

// REQUISITO 3 -- LOGIN VALIDATE
export const checkLogin = (req, res) => {
  const { email, password } = req.body;
  const validEmail = validateEmail(email);
  const validPwd = validatePwd(password);

  if (validEmail.Ok && validPwd.Ok) {
    const token = generateToken();
    return res.status(200).json({ token });
  }

  if (!validEmail.Ok) { return res.status(validEmail.status).json({ message: validEmail.msg }); }
  if (!validPwd.Ok) { return res.status(validPwd.status).json({ message: validPwd.msg }); }
};

// --------------------------------------------------------------------------------------------

// REQUISITO 4 -- ADDED TALKER
export const createTalker = (req, res) => {
  const { name, age, talk } = req.body;
  const { authorization } = req.headers;
  const validToken = validateToken(authorization);
  const validTalker = validateTalker(name, age, talk);

  if (!validToken.Ok) { return res.status(validToken.status).json({ message: validToken.msg }); }
  if (!validTalker.Ok) { return res.status(validTalker.status).json({ message: validTalker.msg }); }

  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const newTalker = { id: talkers.length + 1, name, age, talk };
  talkers.push(newTalker);
  fs.writeFileSync('talker.json', JSON.stringify(talkers));
  console.log(newTalker);
  return res.status(201).json(newTalker);
};

// --------------------------------------------------------------------------------------------
