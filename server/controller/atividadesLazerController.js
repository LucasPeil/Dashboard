const AtividadesLazer = require("../models/atividadesLazerModel");

const asyncHandler = require("express-async-handler");

const getAllAtividadesLazer = asyncHandler(async (req, res) => {
  res.status(200).json(res.paginatedResults);
});
const getJogosQty = asyncHandler(async (req, res) => {
  const qty = await AtividadesLazer.countDocuments({
    categoria: "Jogos",
  }).exec();

  if (typeof qty === "number") {
    res.status(200).json({ jogosQuantidade: qty });
  } else {
    res.status(404);
    throw new Error("Erro ao recuperar os dados");
  }
});
const getCulturaQty = asyncHandler(async (req, res) => {
  const qty = await AtividadesLazer.countDocuments({
    categoria: "Cultura",
  }).exec();
  if (typeof qty === "number") {
    res.status(200).json({ culturaQuantidade: qty });
  } else {
    res.status(404);
    throw new Error("Erro ao recuperar os dados");
  }
});
const getEmGrupoQty = asyncHandler(async (req, res) => {
  const qty = await AtividadesLazer.countDocuments({
    categoria: "Em grupo",
  }).exec();

  if (typeof qty === "number") {
    res.status(200).json({ emGrupoQuantidade: qty });
  } else {
    res.status(404);
    throw new Error("Erro ao recuperar os dados");
  }
});
const getOutrosQty = asyncHandler(async (req, res) => {
  const qty = await AtividadesLazer.countDocuments({
    categoria: "Outros",
  }).exec();

  if (typeof qty === "number") {
    res.status(200).json({ outrosQuantidade: qty });
  } else {
    res.status(404);
    throw new Error("Erro ao recuperar os dados");
  }
});
const getSingleAtividadeLazer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const atividade = await AtividadesLazer.findById(id);

  if (atividade._id) {
    res.status(200).json(atividade);
  } else {
    res.status(404);
    throw new Error("Erro ao inserir dados");
  }
});

const setNewAtividadeLazer = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.data);
  let atividadeLazer;
  let message;

  if (data._id) {
    atividadeLazer = await AtividadesLazer.findById(data._id);
    atividadeLazer.$set(data);
    atividadeLazer = await atividadeLazer.save();
    message = "Aividade atualizada com sucesso.";
  } else {
    delete data._id;

    atividadeLazer = new AtividadesLazer(data);
    atividadeLazer = await atividadeLazer.save();
    message = "Aividade registrada com sucesso.";
  }

  if (atividadeLazer) {
    res.status(201).json({ atividadeLazer, message });
  } else {
    res.status(400);
    throw new Error("Erro ao inserir dados");
  }
});

const deleteAtividadeLazer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const atividade = await AtividadesLazer.findByIdAndDelete(id);

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
  getAllAtividadesLazer,
  getSingleAtividadeLazer,
  setNewAtividadeLazer,
  deleteAtividadeLazer,
  getCulturaQty,
  getJogosQty,
  getEmGrupoQty,
  getOutrosQty,
};
