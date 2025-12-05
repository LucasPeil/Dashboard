const express = require("express");
const {
  getAllAtividadesEducacao,
  setNewAtividadeEducacao,
  getSingleAtividadeEducacao,
  deleteAtividadeEducacao,
  getCursosQty,
  getLivrosQty,
} = require("../controller/atividadesEducacaoController");
const router = express.Router();
const AtividadesEducacao = require("../models/atividadesEducacaoModel");
const paginationHandler = require("../middlewares/paginationMiddleware");
const filter = require("../filterFunction");

const arrSearch = [
  "nomeAtividade",
  "categoria",
  "descricaoAtividade",
  "mesInsercao",
];

router
  .route("/")
  .get(
    paginationHandler(AtividadesEducacao, filter(arrSearch)),
    getAllAtividadesEducacao
  )
  .post(setNewAtividadeEducacao);
router.route("/quantidadeCursos").get(getCursosQty);
router.route("/quantidadeLivros").get(getLivrosQty);

router
  .route("/:id")
  .get(getSingleAtividadeEducacao)
  .delete(deleteAtividadeEducacao);

module.exports = router;
