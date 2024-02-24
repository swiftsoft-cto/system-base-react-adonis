import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PasswordReset from 'App/Models/PasswordResets'
import Users from 'App/Models/Users'
import AuthService from 'App/Services/AuthService'

import { DateTime } from 'luxon'

export default class AuthController {
    private authService = new AuthService()

    public async validateToken({ auth, response }: HttpContextContract) {
        try {
            await auth.check(); 
            const user = auth.user; 
    
            if (user) {
                return response.json({ isValid: true, id_profile: user.id_profile });
            } else {
                return response.json({ isValid: false, message: 'Não foi possível recuperar as informações do usuário.' });
            }
        } catch (error) {
            return response.status(401).json({ isValid: false, message: 'Token inválido ou expirado.' });
        }
    }
    

    public async resetPassword({ request, response }: HttpContextContract) {
        try {
            const { token, password } = request.only(['token', 'password'])

            // Validação da senha
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>çÇ])[A-Za-z\d!@#$%^&*(),.?":{}|<>çÇ]{8,}$/
            if (!password || !passwordRegex.test(password)) {
                return response.badRequest({
                    message: 'A senha deve ter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, um número e um caractere especial.'
                })
            }

            // Primeiro, tente encontrar o token que ainda não expirou
            const passwordReset = await PasswordReset.query()
                .where('token', token)
                .where('expires_at', '>', DateTime.now().toSQL())
                .first()

            // Se não encontrar o token (ou se estiver expirado), retorne um erro específico
            if (!passwordReset) {
                return response.badRequest({ message: 'Token inválido ou expirado.' })
            }

            // Encontrou o token e está válido, prossiga para encontrar o usuário
            const user = await Users.findOrFail(passwordReset.userId)
            user.password = password
            await user.save()

            // Apagar o token após o uso
            await passwordReset.delete()

            // Resposta de sucesso
            return response.ok({ message: 'Senha redefinida com sucesso.' })
        } catch (error) {
            // Log do erro para depuração
            console.error(error.message)
            // Tratamento de erro genérico
            return response.internalServerError({ message: 'Erro ao redefinir a senha. Por favor, tente novamente mais tarde.' })
        }
    }


    public async login({ auth, request, response }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        return await this.authService.login(auth, email, password, response)
    }

    public async register({ request}: HttpContextContract) {
        const data = request.body();
   
        return await this.authService.register(data)
    }

    public async logout({ auth, response }: HttpContextContract) {
        return await this.authService.logout(auth, response)
    }
}
