const UsuarioModelo = require('../modelos/usuarioModelo');

class AuthControlador {
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await UsuarioModelo.authenticate(email, password);

            if (!user) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            const permissions = await UsuarioModelo.getUserPermissions(user.idUser);

            let profileId = null;
            let profileName = null;

            if (permissions && permissions.length > 0) {
                profileName = permissions[0].nickname;
                profileId = permissions[0].idProfile;
            }

            res.json({
                success: true,
                user: {
                    id: user.idUser,
                    name: user.name,
                    email: user.email,
                    profileId: profileId,
                    profileName: profileName
                }
            });

        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = AuthControlador;
