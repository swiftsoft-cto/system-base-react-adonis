import Projects from 'App/Models/Projects';

export default class ProjectsService {

    public static async getProjects(userId, userProfile) {
        let projects;

        if (userProfile === 1) { // Se for Admin
            projects = await Projects.query()
                .preload('phases', (phasesQuery) => {
                    phasesQuery.preload('contracts');
                })
        } else if (userProfile === 2) { // Se for Cliente
            projects = await Projects.query()
                .where('user_id', userId)
                .whereNull('deleted_at')
                .preload('phases', (phasesQuery) => {
                    phasesQuery.preload('contracts');
                })
        }
        
        return projects;
    }
}
