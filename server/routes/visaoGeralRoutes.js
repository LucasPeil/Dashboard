const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const { getDinheiroGasto } = require('../controller/visaoGeralController');

router.route('/').get(protect, getDinheiroGasto);

module.exports = router;
