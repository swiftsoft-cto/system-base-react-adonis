import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Status extends BaseSchema {
  protected tableName = 'status'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name')
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.timestamp('deleted_at', { useTz: true }).nullable() 
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
