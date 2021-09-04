const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
const HTPP_ERROR_STATUS = 404;

// 1
const getAll = async (_req, res) => {
  const file = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));

  res.status(HTTP_OK_STATUS).json(file);
};

// 2
const getFilterId = async (req, res) => {
  const { id } = req.params;
  const file = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  const fileFilter = file.find((item) => item.id === Number(id));

  if (!fileFilter) {
    return res.status(HTPP_ERROR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
    res.status(HTTP_OK_STATUS).json(fileFilter);
};

module.exports = { getAll, getFilterId };