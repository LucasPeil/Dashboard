const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  getAllAtividadesCasa,
  getSingleAtividade,
  setNewAtividadeCasa,
  deleteAtividade,
  getComprasQty,
  getLimpezaQty,
  getRefeicoesQty,
} = require("../controller/atividadesCasaController");
const paginationHandler = require("../middlewares/paginationMiddleware");
const AtividadesCasa = require("../models/atividadesCasaModel");
const filter = require("../filterFunction");
const arrSearch = [
  "nomeAtividade",
  "categoria",
  "descricaoAtividade",
  "mesInsercao",
];

router.route("/newAtividade").post(protect,setNewAtividadeCasa);
router
  .route("/")
  .get(protect,
    paginationHandler(AtividadesCasa, filter(arrSearch)),
    getAllAtividadesCasa
  );
router.route("/quantidadeCompras").get(getComprasQty);
router.route("/quantidadeLimpeza").get(getLimpezaQty);
router.route("/quantidadeRefeicoes").get(getRefeicoesQty);
router.route("/:id").get(protect,getSingleAtividade).delete(protect,deleteAtividade);

module.exports = router;
