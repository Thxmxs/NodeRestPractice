const express = require("express");
const router = express.Router();

router.use('/usuario',require("./usuario.js"))
router.use('/login',require("./login.js"))

module.exports = router;