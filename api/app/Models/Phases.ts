import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Projects from 'App/Models/Projects'
import Contract from './Contracts'

export default class Phases extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public project_id: number

  @column()
  public status: string

  @column.dateTime() 
  public start_date: DateTime
  
  @column.dateTime() 
  public end_date: DateTime

  @column()
  public description: string

  @column()
  public hours_purchased: number

  @column()
  public hours_remaining: number

  @column()
  public requirements_scope: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public deleted_at: DateTime;
  
  @belongsTo(() => Projects)
  public project: BelongsTo<typeof Projects>

  @hasMany(() => Contract, {
    foreignKey: 'phase_id',
  })
  public contracts: HasMany<typeof Contract>
}
