// Dentro de um controller
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MailService from 'App/Services/MailService';

export default class UsersController {
  public async sendMail({ request, response }: HttpContextContract) {
    const { email } = request.only(['email']);

    // Use o serviço para enviar o e-mail
    await MailService.sendEmail(email);

    return response.ok({ message: 'E-mail de boas-vindas enviado.' });
  }
}
