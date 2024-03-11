// database/seeders/Project.ts
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Projects from 'App/Models/Projects'

export default class ProjectSeeder extends BaseSeeder {
  public async run() {
    await Projects.createMany([
      {
        user_id: 2,
        name: 'Inpreart - WebSite',
      },
      {
        user_id: 2,
        name: 'Irmãos Cruz - WebSite',
      },
      {
        user_id: 3,
        name: 'Matheus Halan - WebSite',
      },
      {
        user_id: 4,
        name: 'Ribeira Diesel - WebSite',
      },
      {
        user_id: 5,
        name: 'Policlínica Guaraituba - Chatbot',
      },
      {
        user_id: 6,
        name: 'VEXT IMob - WebSite',
      },
    ])
  }
}
