const AtividadesCasa = require('../models/atividadesCasaModel');
const AtividadesLazer = require('../models/atividadesLazerModel');
const AtividadesEducacao = require('../models/atividadesEducacaoModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const getTempoGasto = asyncHandler(async (req, res) => {
  const tempoCasa = await AtividadesCasa.distinct('tempoGasto', {});
  const tempoLazer = await AtividadesLazer.distinct('tempoGasto', {});
  const tempoEducacao = await AtividadesEducacao.distinct('tempoGasto', {});
  let tempoCasaSum = 0;
  let tempoLazerSum = 0;
  let tempoEducacaoSum = 0;
  if (tempoCasa.length > 0) {
    tempoCasaSum = tempoCasa.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
  }

  if (tempoLazer.length > 0) {
    tempoLazerSum = tempoLazer.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
  }
  if (tempoEducacao.length > 0) {
    tempoEducacaoSum = tempoEducacao.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
  }

  res.status(200).json({ tempoCasaSum, tempoLazerSum, tempoEducacaoSum });
});
const getDinheiroGasto = asyncHandler(async (req, res) => {
  const ano = parseInt(req.query.ano);
  const userId = req.query.userId;
  let dinheiroCasaMes;
  let dinheiroLazerMes;
  let dinheiroEducacaoMes;
  try {
    dinheiroCasaMes = await AtividadesCasa.aggregate([
      {
        $match: {
          anoInsercao: ano,

          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: { mes: '$mesInsercao' },
          totalAmount: { $sum: '$dinheiroGasto' },
        },
      },
    ]);
  } catch (error) {
    console.error('Erro no aggregate:', error.message);
  }
  try {
    dinheiroEducacaoMes = await AtividadesEducacao.aggregate([
      {
        $match: {
          anoInsercao: ano,
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: { mes: '$mesInsercao' },
          totalAmount: { $sum: '$dinheiroGasto' },
        },
      },
    ]);
  } catch (error) {
    console.error('Erro no aggregate:', error.message);
  }

  try {
    dinheiroLazerMes = await AtividadesLazer.aggregate([
      {
        $match: {
          anoInsercao: ano,
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: { mes: '$mesInsercao' },
          totalAmount: { $sum: '$dinheiroGasto' },
        },
      },
    ]);
  } catch (error) {
    console.error('Erro no aggregate:', error.message);
  }

  res
    .status(200)
    .json({ dinheiroCasaMes, dinheiroLazerMes, dinheiroEducacaoMes });
});

module.exports = { getDinheiroGasto };
