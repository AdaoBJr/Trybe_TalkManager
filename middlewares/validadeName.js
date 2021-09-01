const validateName = (name, age, res) => {
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  const nameIsValid = 3;
  if (name.length <= nameIsValid) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  const ageIsValid = 18;
  if (age < ageIsValid) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
};

module.exports = {
  validateName,
};
