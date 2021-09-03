const dataPalestrantes = require('./dataPalestrantes');

const HTTP_OK_STATUS = 200;

async function showPalestrantes(_req, res) {
  const data = await dataPalestrantes();
  if (data.length === 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  return res.status(HTTP_OK_STATUS).json(data);
}

module.exports = showPalestrantes;
