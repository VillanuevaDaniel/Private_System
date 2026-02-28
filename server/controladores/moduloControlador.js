const ModuloModelo = require('../modelos/moduloModelo');

class ModuloControlador {
    static async getModules(req, res) {
        try {
            const { userId } = req.query;
            const modules = await ModuloModelo.getActiveModules(userId);
            res.json(modules);
        } catch (error) {
            console.error('Error fetching modules:', error);
            res.status(500).json({ error: 'Error fetching modules', details: error.message });
        }
    }
}

module.exports = ModuloControlador;
