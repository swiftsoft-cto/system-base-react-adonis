import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import projectsService from 'App/Services/ProjectsService'

export default class ProjectsController {

    public async getProjects({ auth, response }: HttpContextContract) {
        const user:any = auth.user;
        const userId = user?.id;
        const userProfile = user?.id_profile;
        const userProjects = await projectsService.getProjects(userId, userProfile);
        return response.json(userProjects);
    }
}