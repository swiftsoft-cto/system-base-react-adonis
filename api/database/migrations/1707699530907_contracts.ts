import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contracts extends BaseSchema {
  protected tableName = 'contracts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('phase_id').unsigned().references('id').inTable('phases').onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('path').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })

  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}