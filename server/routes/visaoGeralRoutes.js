const express = require("express");
const router = express.Router();

const { getDinheiroGasto } = require("../controller/visaoGeralController");

router.route("/dinheiroGasto").get(getDinheiroGasto);

module.exports = router;
