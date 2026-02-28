const express = require('express');
const cors = require('cors');
require('dotenv').config();

const rutasPrueba = require('./rutas/rutasPrueba');
const rutasModulo = require('./rutas/rutasModulo');
const rutasAuth = require('./rutas/rutasAuth');
const rutasUsuario = require('./rutas/rutasUsuario');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', rutasPrueba);
app.use('/api/modules', rutasModulo);
app.use('/api/login', rutasAuth);
app.use('/api/users', rutasUsuario);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
