import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Users from 'App/Models/Users';

export default class RegisterController {

  public async userSettings({ auth, response }: HttpContextContract) {
    const loggedUser = auth.user;
    const userId = loggedUser?.id;

    if (userId) {
      const user = await Users.query().where('id', userId).first()

      if (user?.id_profile === 1) {

        const admin = await Users.query().where('id', userId).first()
        return response.json({ name: admin?.name, email: admin?.email, id: admin?.id })

      } 

      else if (user?.id_profile === 2) {

        const client = await Users.query().where('id', userId).first()
        return response.json({ name: client?.name, email: client?.email, id: client?.id })

      } 

      else if (user?.id_profile === 3) {

        const projectManager = await Users.query().where('id', userId).first()
        return response.json({ name: projectManager?.name, email: projectManager?.email, id: projectManager?.id })

      } 
    }
    return response.json({ 'error': 'Ocorreu um erro ao consultar o usuário.' });
  }

  public async accessLevel({ auth, response }: HttpContextContract) {
    const loggedUser = auth.user;
    const userId = loggedUser?.id

    if (userId) {
      const user = await Users.query().where('id', userId).first()
      return response.json({ nivel: user?.id_profile })
    }
    return response.json({ 'error': 'Ocorreu um erro ao consultar o usuário.' })
  }
}