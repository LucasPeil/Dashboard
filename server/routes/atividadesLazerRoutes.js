const express = require("express");
const {
  getAllAtividadesLazer,
  setNewAtividadeLazer,
  getSingleAtividadeLazer,
  deleteAtividadeLazer,
  getJogosQty,
  getCulturaQty,
  getEmGrupoQty,
  getOutrosQty,
} = require("../controller/atividadesLazerController");
const router = express.Router();
const AtividadesLazer = require("../models/atividadesLazerModel");
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
    paginationHandler(AtividadesLazer, filter(arrSearch)),
    getAllAtividadesLazer
  )
  .post(setNewAtividadeLazer);
router.route("/quantidadeJogos").get(getJogosQty);
router.route("/quantidadeCultura").get(getCulturaQty);
router.route("/quantidadeEmGrupo").get(getEmGrupoQty);
router.route("/quantidadeOutros").get(getOutrosQty);
router.route("/:id").get(getSingleAtividadeLazer).delete(deleteAtividadeLazer);

module.exports = router;
