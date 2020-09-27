import { modelOptions, prop } from '@typegoose/typegoose'
import { dateUTCNow } from 'common/utils/dateUTCNow'

@modelOptions({
  schemaOptions: {
    timestamps: {
      currentTime: dateUTCNow,
    },
  },
})
export class BaseAbilitiesSchema {
  @prop({ required: true })
  type!: string

  @prop()
  abilities?: {
    strength?: number
    dexterity?: number
    constitution?: number
    intelligence?: number
    wisdom?: number
    charisma?: number
  }

  @prop()
  createdAt?: number

  @prop()
  updatedAt?: number
}
