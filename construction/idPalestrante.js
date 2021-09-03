const dataPalestrantes = require('./dataPalestrantes');

const msgErro = { message: 'Pessoa palestrante não encontrada' };

const HTTP_OK_STATUS = 200;

async function idPalestrante(req, res) {
  const { params: { id } } = req;
  const data = await dataPalestrantes();
  const aux = data.find((auxa) => auxa.id === +id);
  if (!aux) {
    return res.status(404).json(msgErro);
  }
  return res.status(HTTP_OK_STATUS).json(aux);
}

module.exports = idPalestrante;
