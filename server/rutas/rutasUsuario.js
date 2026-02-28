const express = require('express');
const router = express.Router();
const usuarioControlador = require('../controladores/usuarioControlador');

router.get('/', usuarioControlador.getUsers);

module.exports = router;
