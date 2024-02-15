import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PgrPerfis from 'App/Models/Perfis'

export default class PgrPerfisSeeder extends BaseSeeder {

    public async run() {
        await PgrPerfis.createMany([
            {
                name: 'admin'
            },
            {
                name: 'cliente',
            },


        ])
    }

}
