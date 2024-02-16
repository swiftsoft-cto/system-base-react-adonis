import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Users from 'App/Models/Users'

export default class UsersSeeder extends BaseSeeder {

    public async run() {
        await Users.createMany([
            {
                id_profile: 1,
                name: 'Higor Soares',
                email: 'codehs07@gmail.com',
                password: '123',
            },
            {
                id_profile: 2,
                name: 'Jean Marcondes',
                email: 'cliente@email.com',
                password: '123',
            },
        ])
    }

}
