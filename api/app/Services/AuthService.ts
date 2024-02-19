import Users from 'App/Models/Users'

export default class AuthService {

    public async login(auth, email, password, response) {
        const user = await Users.findBy('email', email)
        if (!user) {
            return response.status(404).json({ message: 'Usuário não encontrado.' });
        }

        try {
            const token = await auth.use('api').attempt(email, password, {
                expiresIn: '300mins',
                name: user?.email,
            })
            return { token, user: { id: user?.id, email: user?.email, id_profile: user?.id_profile } }
        } catch (error) {
            return response.status(401).json({ message: 'E-mail ou senha incorretos' });

        }
    }

    public async logout(auth, response) {
        try {
            await auth.use('api').revoke()
            return {
                revoked: true
            }
        } catch {
            return response.badRequest('Erro ao fazer logout')
        }
    }
}
