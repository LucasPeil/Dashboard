const AtividadesEducacao = require("../models/atividadesEducacaoModel");

const asyncHandler = require("express-async-handler");

const getAllAtividadesEducacao = asyncHandler(async (req, res) => {
  res.status(200).json(res.paginatedResults);
});
const getCursosQty = asyncHandler(async (req, res) => {
  const qty = await AtividadesEducacao.countDocuments({
    categoria: "Cursos",
  }).exec();

  if (typeof qty === "number") {
    res.status(200).json({ cursosQuantidade: qty });
  } else {
    res.status(404);
    throw new Error("Erro ao recuperar os dados");
  }
});
const getLivrosQty = asyncHandler(async (req, res) => {
  const qty = await AtividadesEducacao.countDocuments({
    categoria: "Livros",
  }).exec();
  if (typeof qty === "number") {
    res.status(200).json({ livrosQuantidade: qty });
  } else {
    res.status(404);
    throw new Error("Erro ao recuperar os dados");
  }
});
const getSingleAtividadeEducacao = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const atividade = await AtividadesEducacao.findById(id);

  if (atividade._id) {
    res.status(200).json(atividade);
  } else {
    res.status(404);
    throw new Error("Erro ao inserir dados");
  }
});

const setNewAtividadeEducacao = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.data);
  let atividadeEducacao;
  let message;
  if (data._id) {
    atividadeEducacao = await AtividadesEducacao.findById(data._id);
    atividadeEducacao.$set(data);
    atividadeEducacao = await atividadeEducacao.save();
    message = "Aividade atualizada com sucesso.";
  } else {
    delete data._id;
    atividadeEducacao = new AtividadesEducacao(data);
    atividadeEducacao = await atividadeEducacao.save();
    message = "Aividade registrada com sucesso.";
  }

  if (atividadeEducacao) {
    res.status(201).json({ atividadeEducacao, message });
  } else {
    res.status(400);
    throw new Error("Erro ao inserir dados");
  }
});

const deleteAtividadeEducacao = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const atividade = await AtividadesEducacao.findByIdAndDelete(id);

  if (atividade) {
    res
      .status(200)
      .json({ atividade, message: "Atividade excluída com sucesso" });
  } else {
    res.status(400);
    throw new Error("Erro ao tentar excluir dados");
  }
});

module.exports = {
  getAllAtividadesEducacao,
  getSingleAtividadeEducacao,
  setNewAtividadeEducacao,
  deleteAtividadeEducacao,
  getCursosQty,
  getLivrosQty,
};
