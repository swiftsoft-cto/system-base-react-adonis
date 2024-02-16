import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/Users'

export default class PasswordReset extends BaseModel {
  public static table = 'password_resets'

  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public token: string

  @column.dateTime({ autoCreate: true })
  public expires_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: true })
  public updated_at: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
