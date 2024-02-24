import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService';

export default class UserController {

  public async accessLevel({ auth, response }: HttpContextContract) {
    if (!auth.user) {
      return response.json({ 'error': 'Usuário não autenticado.' });
    }

    try {
      const level = await UserService.accessLevel(auth.user.id);
      return response.json({ level });
    } catch (error) {
      return response.json({ 'error': error.message });
    }
  }

  public async userSettings({ auth, response }: HttpContextContract) {
    if (!auth.user) {
      return response.status(404).json({ error: 'Usuário não autenticado.' });
    }

    try {
      const userSettings = await UserService.userSettings(auth.user.id);
      return response.json(userSettings);
    } catch (error) {
      return response.status(404).json({ error: error.message });
    }
  }

  public async editUserSettings({ auth, request, response }: HttpContextContract) {
    if (!auth.user) {
      return response.status(404).json({ error: 'Usuário não autenticado.' });
    }

    try {
      const { name, email } = request.only(['name', 'email']);
      const user = await UserService.editUserSettings(auth.user.id, name, email);
      return response.ok({ message: 'Usuário atualizado com sucesso.', user });
    } catch (error) {
      console.error(error);
      return response.internalServerError({ error: 'Erro ao atualizar configurações do usuário.' });
    }
  }

}
