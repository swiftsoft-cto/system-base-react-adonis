import { v4 as uuidv4 } from 'uuid'
import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'

export default class PgrPerfil extends BaseModel {
  public static table = 'profiles'

  @column({ isPrimary: true })
  public id: number

  @column()
  public id_secure: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @beforeCreate()
  public static assignUuid(perfil: PgrPerfil) {
    perfil.id_secure = uuidv4()
  }
}
