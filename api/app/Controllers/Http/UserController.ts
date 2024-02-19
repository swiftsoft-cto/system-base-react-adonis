import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/Users'; // Verifique se o nome do modelo está correto

export default class UserSettingsController {

  // O método accessLevel parece adequado, mas poderia ser simplificado se auth.user já contiver id_profile.
  public async accessLevel({ auth, response }: HttpContextContract) {
    if (!auth.user) {
      return response.json({ 'error': 'Usuário não autenticado.' });
    }

    return response.json({ nivel: auth.user.id_profile });
  }

  public async userSettings({ auth, response }: HttpContextContract) {
    const user = auth.user;

    if (!user) {
      return response.status(404).json({ error: 'Usuário não autenticado.' });
    }

    // Assumindo que você deseja obter informações frescas do banco de dados
    const freshUser = await User.query().where('id', user.id).first();

    if (!freshUser) {
      return response.status(404).json({ error: 'Usuário não encontrado.' });
    }

    return response.json({
      name: freshUser.name,
      email: freshUser.email,
      id: freshUser.id,
      id_profile: freshUser.id_profile
    });
  }

  public async editUserSettings({ auth, request, response }: HttpContextContract) {
    const user = auth.user;

    if (!user) {
      return response.status(404).json({ error: 'Usuário não autenticado.' });
    }

    try {
      // Validações ou lógicas de negócio antes de aplicar as mudanças
      const { name, email } = request.only(['name', 'email']);

      user.merge({ name, email });
      await user.save();

      return response.ok({ message: 'Usuário atualizado com sucesso.', user });
    } catch (error) {
      console.error(error); // Considerar logar o erro de maneira adequada
      return response.internalServerError({ error: 'Erro ao atualizar configurações do usuário.' });
    }
  }



}
