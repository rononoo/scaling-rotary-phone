import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Application extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public trackingNumber: string

  @column()
  public loanType: string

  @column()
  public loanAmount: number

  @column()
  public loanDuration: number

  @column()
  public employer: string

  @column()
  public occupation: string

  @column()
  public income: number

  @column()
  public comments: string

  @column()
  public acceptTerms: boolean

  @column()
  public acceptConditions: boolean

  @column()
  public status: string

  @column()
  public notes: string

  @column()
  public progress: number

  @column()
  public userId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static generateTrackingNumber(length = 10) {
    let trackingNumber = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const charactersLength = characters.length

    for (let i = 0; i < length; i++) {
      trackingNumber += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return trackingNumber
  }
}
