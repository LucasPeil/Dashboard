const express = require('express');
const protect = require('../middlewares/authMiddleware');
const authorization = require('../middlewares/authorizationMiddleware');
const {
  getAllAtividadesLazer,
  setNewAtividadeLazer,
  getSingleAtividadeLazer,
  deleteAtividadeLazer,
  getJogosQty,
  getCulturaQty,
  getEmGrupoQty,
  getOutrosQty,
} = require('../controller/atividadesLazerController');
const router = express.Router();
const AtividadesLazer = require('../models/atividadesLazerModel');
const paginationHandler = require('../middlewares/paginationMiddleware');
const filter = require('../filterFunction');
const arrSearch = [
  'nomeAtividade',
  'categoria',
  'descricaoAtividade',
  'mesInsercao',
];

router
  .route('/')
  .get(
    protect,
    paginationHandler(AtividadesLazer, filter(arrSearch)),
    getAllAtividadesLazer
  )
  .post(protect, authorization, setNewAtividadeLazer);
router.route('/quantidadeJogos').get(protect, getJogosQty);
router.route('/quantidadeCultura').get(protect, getCulturaQty);
router.route('/quantidadeEmGrupo').get(protect, getEmGrupoQty);
router.route('/quantidadeOutros').get(protect, getOutrosQty);
router
  .route('/:id')
  .get(protect, authorization, getSingleAtividadeLazer)
  .delete(protect, authorization, deleteAtividadeLazer);

module.exports = router;
