const db = require('../configuracion/db');

class UsuarioModelo {
    static async authenticate(email, password) {
        const [users] = await db.query(
            'SELECT * FROM user WHERE email = ? AND password = ?',
            [email, password]
        );
        return users.length > 0 ? users[0] : null;
    }

    static async getUserPermissions(userId) {
        const [permissions] = await db.query(
            `SELECT p.nickname, p.idProfile 
             FROM permissions perm
             JOIN profile p ON perm.idProfile = p.idProfile
             WHERE perm.idUser = ?`,
            [userId]
        );
        return permissions;
    }

    static async getAllUsers() {
        const [rows] = await db.query('SELECT * FROM user');
        return rows;
    }
}

module.exports = UsuarioModelo;
