import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Profiles from 'App/Models/Profiles'

export default class ProfilesSeeder extends BaseSeeder {

    public async run() {
        await Profiles.createMany([
            {
                name: 'admin'
            },
            {
                name: 'cliente',
            },
        ])
    }

}
