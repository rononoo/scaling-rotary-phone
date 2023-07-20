import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    await User.create({
      email: Env.get('ADMIN_MAIL'),
      password: Env.get('ADMIN_PASSWORD'),
      role: 'admin',
      phone: '000000000',
      firstName: 'admin',
      lastName: 'admin',
      title: 'mrs',
      maritalStatus: 'single',
      language: 'fr'
    })
  }
}
