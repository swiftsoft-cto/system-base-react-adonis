import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext' 
import AuthService from 'App/Services/AuthService'

export default class AuthController {
    private authService = new AuthService()

    public async validateToken({ auth, response }: HttpContextContract) {
        try {
            await auth.authenticate()
            return response.status(200).json({ isValid: true })
        } catch (error) {
            if (error.name === 'TokenExpiredException') {
                return response.status(401).json({ isValid: false, message: 'Token expirado' })
            }
            return response.status(401).json({ isValid: false, message: 'Token inválido' })
        }
    }

    public async login({ auth, request, response }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        return await this.authService.login(auth, email, password, response)
    }

    public async logout({ auth, response }: HttpContextContract) {
        return await this.authService.logout(auth, response)
    }
}
