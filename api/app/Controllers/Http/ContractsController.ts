import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import contractsService from 'App/Services/ContractsService'

export default class ProjectsController {

    public async getContracts({ auth, response }: HttpContextContract) {
        const user = auth.user;
        const userId = user?.id;
        const userProjects = await contractsService.getContracts(userId);
        return response.json(userProjects);
    }
}