const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const authorization = require('../middlewares/authorizationMiddleware');
const {
  getAllAtividadesCasa,
  getSingleAtividade,
  setNewAtividadeCasa,
  deleteAtividade,
  getComprasQty,
  getLimpezaQty,
  getRefeicoesQty,
} = require('../controller/atividadesCasaController');
const paginationHandler = require('../middlewares/paginationMiddleware');
const AtividadesCasa = require('../models/atividadesCasaModel');
const filter = require('../filterFunction');
const arrSearch = [
  'nomeAtividade',
  'categoria',
  'descricaoAtividade',
  'mesInsercao',
];

router.route('/newAtividade').post(protect, authorization, setNewAtividadeCasa);
router
  .route('/')
  .get(
    protect,
    paginationHandler(AtividadesCasa, filter(arrSearch)),
    getAllAtividadesCasa
  );
router.route('/quantidadeCompras').get(protect, getComprasQty);
router.route('/quantidadeLimpeza').get(protect, getLimpezaQty);
router.route('/quantidadeRefeicoes').get(protect, getRefeicoesQty);
router
  .route('/:id')
  .get(protect, authorization, getSingleAtividade)
  .delete(protect, authorization, deleteAtividade);

module.exports = router;
