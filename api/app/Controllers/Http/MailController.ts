// MailController
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import crypto from 'crypto';
import MailService from 'App/Services/MailService';
import PasswordReset from 'App/Models/PasswordResets';
import { DateTime } from 'luxon';
import Users from 'App/Models/Users';

export default class UsersController {

  // public async sendMail({ request, response }: HttpContextContract) {
  //   const { email } = request.only(['email']);

  //   // Use o serviço para enviar o e-mail
  //   await MailService.sendRecoveryEmail(email);

  //   return response.ok({ message: 'E-mail enviado.' });
  // }

  public async recoverToken({ request, response }: HttpContextContract) {
    const email = request.input('email');
    const user = await Users.findByOrFail('email', email);

    // Gerar um token único
    const token = crypto.randomBytes(10).toString('hex');

    // Salvar o token na tabela de password_resets
    await PasswordReset.updateOrCreate(
        { userId: user.id },
        { token, expires_at: DateTime.now().plus({ minutes: 10 }) }
    );

    // Enviar e-mail com o token usando o serviço corrigido
    const sendResult = await MailService.sendRecoveryEmail(email, token);

    if (sendResult.success) {
        return response.ok({ message: 'E-mail de recuperação enviado.' });
    } else {
        return response.internalServerError({ message: 'Falha ao enviar e-mail de recuperação.' });
    }
}
}
