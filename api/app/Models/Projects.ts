import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/Users'
import Phase from 'App/Models/Phases'

export default class Projects extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public deleted_at: DateTime;
  
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Phase, {
    foreignKey: 'project_id',
  })
  public phases: HasMany<typeof Phase>


}
