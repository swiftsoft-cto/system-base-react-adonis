import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Status from 'App/Models/Status'

export default class StatusSeeder extends BaseSeeder {
  public async run() {
    await Status.createMany([
      {
        name: 'Concluído',
      },
      {
        name: 'Em Andamento',
      },
      {
        name: 'Pendente',
      },
      {
        name: 'Parado',
      },
      {
        name: 'Cancelado',
      },
    ])
  }
}
