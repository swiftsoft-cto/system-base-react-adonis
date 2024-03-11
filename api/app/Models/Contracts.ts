import { DateTime } from 'luxon'
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Contracts extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public phase_id: number

  @column()
  public name: string

  @column()
  public path: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public deleted_at: DateTime;


}
