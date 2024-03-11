import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Phases extends BaseSchema {
  protected tableName = 'phases'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE')
      table.string('status', 50).notNullable()
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.text('description').notNullable()
      table.integer('hours_purchased').notNullable()
      table.integer('hours_remaining').notNullable()
      table.text('requirements_scope').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.timestamp('deleted_at', { useTz: true }).nullable() 
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}