const express = require('express');
const router = express.Router();
const moduloControlador = require('../controladores/moduloControlador');

router.get('/', moduloControlador.getModules);

module.exports = router;
