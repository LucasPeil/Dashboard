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
const protect = require("../middlewares/authMiddleware");

const arrSearch = [
  "nomeAtividade",
  "categoria",
  "descricaoAtividade",
  "mesInsercao",
];

router
  .route("/")
  .get(protect,
    paginationHandler(AtividadesEducacao, filter(arrSearch)),
    getAllAtividadesEducacao
  )
  .post(protect,setNewAtividadeEducacao);
router.route("/quantidadeCursos").get(getCursosQty);
router.route("/quantidadeLivros").get(getLivrosQty);

router
  .route("/:id")
  .get(protect, getSingleAtividadeEducacao)
  .delete(protect,deleteAtividadeEducacao);

module.exports = router;
