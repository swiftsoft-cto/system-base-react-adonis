import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PasswordResets extends BaseSchema {
  protected tableName = 'password_resets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('token').notNullable()
      table.timestamp('expires_at').notNullable()
      table.timestamps(true) 
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
