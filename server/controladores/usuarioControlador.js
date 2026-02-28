const UsuarioModelo = require('../modelos/usuarioModelo');

class UsuarioControlador {
    static async getUsers(req, res) {
        try {
            const users = await UsuarioModelo.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Error fetching users', details: error.message });
        }
    }
}

module.exports = UsuarioControlador;
