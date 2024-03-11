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
                name: 'Caroline',
                email: 'inpreart@inpreart.com.br',
                password: '123',
            },
            {
                id_profile: 2,
                name: 'Matheus Halan',
                email: 'contato@matheushalan.com.br',
                password: '123',
            },
            {
                id_profile: 2,
                name: 'Liliane',
                email: 'ribeiradiesel@ribeiradiesel.com.br',
                password: '123',
            },
            {
                id_profile: 2,
                name: 'Tatiane',
                email: 'atendimento@policlinicaguaraituba.com.br',
                password: '123',
            },
            {
                id_profile: 2,
                name: 'Juliano',
                email: 'vext@fake.com.br',
                password: '123',
            },
            {
                id_profile: 2,
                name: 'Bruno Paulus',
                email: 'pauluscopos@fake.com.br',
                password: '123',
            },
        ])
    }
}
