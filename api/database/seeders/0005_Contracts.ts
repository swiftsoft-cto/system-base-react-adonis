// database/seeders/Contract.ts
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Contract from 'App/Models/Contracts'

export default class ContractSeeder extends BaseSeeder {
  public async run() {
    await Contract.createMany([
      {
        phase_id: 1,
        name: 'Levantamento de requisitos LP',
        path: '/assets/contracts/project_1/requirements.pdf',
      },
      {
        phase_id: 2,
        name: 'Levantamento de requisitos ADM',
        path: '/assets/contracts/project_1/requirements.pdf',
      },
    ])
  }
}
