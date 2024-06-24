import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import { customAlphabet } from 'nanoid'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'


const nanoid = customAlphabet('abcdefghijklmnopqrstuv0987654321', 6)

export default class Url extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare shortId: string

  @column()
  declare userId: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare website: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @beforeCreate()
   static assignShortId(url: Url) {
    url.shortId = nanoid()
  }
}
