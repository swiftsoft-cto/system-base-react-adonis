import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PasswordResets extends BaseModel {
  public static table = 'password_resets'

  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public token: string

  @column.dateTime({ autoCreate: true })
  public expires_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: true })
  public updated_at: DateTime
}
