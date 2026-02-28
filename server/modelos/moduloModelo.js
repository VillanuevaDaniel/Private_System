const db = require('../configuracion/db');

class ModuloModelo {
    static async getActiveModules(userId) {
        if (userId) {
            const query = `
                SELECT m.* 
                FROM module m
                JOIN permissions p ON m.idModule = p.idModule
                WHERE m.status = 1 AND p.idUser = ?
            `;
            const [rows] = await db.query(query, [userId]);
            return rows;
        } else {
             return [];
        }
    }
}

module.exports = ModuloModelo;
