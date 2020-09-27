import {
  DocumentType,
  getModelForClass,
  modelOptions,
  plugin,
  prop,
  Ref,
} from '@typegoose/typegoose'
import uniqueValidator from 'mongoose-unique-validator'
import { dateUTCNow } from 'common/utils/dateUTCNow'
import { UserSchema } from 'modules/user/user.schema'
import { RaceSchema } from 'modules/character/race/race.schema'
import { BaseAbilitiesSchema } from 'modules/character/baseAbilities/baseAbilities.schema'

@modelOptions({
  options: {
    customName: 'Character',
  },
  schemaOptions: {
    timestamps: {
      currentTime: dateUTCNow,
    },
  },
})
@plugin(uniqueValidator)
export class CharacterSchema {
  @prop({ required: true, ref: UserSchema, index: true })
  userId!: Ref<UserSchema>

  @prop({ required: true })
  name!: string

  @prop()
  baseAbilities?: BaseAbilitiesSchema

  @prop()
  createdAt!: number

  @prop()
  updatedAt!: number

  @prop()
  race?: RaceSchema
}

export type CharacterDocument = DocumentType<CharacterSchema>

export const Character = getModelForClass(CharacterSchema)
