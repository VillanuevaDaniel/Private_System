const express = require('express');
const router = express.Router();
const authControlador = require('../controladores/authControlador');

router.post('/', authControlador.login);

module.exports = router;
