const AtividadesCasa = require('../models/atividadesCasaModel');
const asyncHandler = require('express-async-handler');

const getAllAtividadesCasa = asyncHandler(async (req, res) => {
  res.status(200).json(res.paginatedResults);
});
const getComprasQty = asyncHandler(async (req, res) => {
  const qty = await AtividadesCasa.countDocuments({
    categoria: 'Compras',
  }).exec();

  if (typeof qty === 'number') {
    res.status(200).json({ comprasQuantidade: qty });
  } else {
    res.status(404);
    throw new Error('Erro ao recuperar os dados');
  }
});
const getLimpezaQty = asyncHandler(async (req, res) => {
  const qty = await AtividadesCasa.countDocuments({
    categoria: 'Limpeza',
  }).exec();
  if (typeof qty === 'number') {
    res.status(200).json({ limpezaQuantidade: qty });
  } else {
    res.status(404);
    throw new Error('Erro ao recuperar os dados');
  }
});
const getRefeicoesQty = asyncHandler(async (req, res) => {
  const qty = await AtividadesCasa.countDocuments({
    categoria: 'Refeições',
  }).exec();
  if (typeof qty === 'number') {
    res.status(200).json({ refeicoesQuantidade: qty });
  } else {
    res.status(404);
    throw new Error('Erro ao recuperar os dados');
  }
});
const getSingleAtividade = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const atividade = await AtividadesCasa.findById(id);

  if (atividade._id) {
    res.status(200).json(atividade);
  } else {
    res.status(404);
    throw new Error('Erro ao inserir dados');
  }
});

const setNewAtividadeCasa = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.data);

  let atividadeCasa;
  let message;

  if (data._id) {
    atividadeCasa = await AtividadesCasa.findById(data._id);
    atividadeCasa.$set(data);
    atividadeCasa = await atividadeCasa.save();
    message = 'Aividade atualizada com sucesso.';
  } else {
    delete data._id;
    atividadeCasa = new AtividadesCasa(data);
    atividadeCasa = await atividadeCasa.save();
    message = 'Aividade registrada com sucesso.';
  }

  if (atividadeCasa) {
    res.status(201).json({ atividadeCasa, message });
  } else {
    res.status(400);
    throw new Error('Erro ao inserir dados');
  }
});

const deleteAtividade = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const atividade = await AtividadesCasa.findByIdAndDelete(id);

  if (atividade) {
    res
      .status(200)
      .json({ atividade, message: 'Atividade excluída com sucesso' });
  } else {
    res.status(400);
    throw new Error('Erro ao tentar excluir dados');
  }
});

module.exports = {
  getAllAtividadesCasa,
  getSingleAtividade,
  setNewAtividadeCasa,
  deleteAtividade,
  getComprasQty,
  getLimpezaQty,
  getRefeicoesQty,
};
