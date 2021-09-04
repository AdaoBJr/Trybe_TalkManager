import fs from 'fs';

// REQUISITO 1 -- GET ALL TALKERS
export const getAllTalkers = (_req, res) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));

  if (talkers.length > 0) { return res.status(200).json(talkers); }
  if (talkers.length === 0) { return res.status(200).json([]); }
};

// REQUISITO 2 -- GET TALKERS BY ID
export const getTalkersById = (req, res) => {
  const { id } = req.params;

  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));

  const talker = talkers.find((person) => person.id === +id);

  if (talker) { return res.status(200).json(talker); }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};
