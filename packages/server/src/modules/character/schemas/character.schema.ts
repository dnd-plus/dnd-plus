import {
  DocumentType,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose'
import { dateUTCNow } from 'common/utils/dateUTCNow'
import { UserSchema } from 'modules/user/user.schema'
import { RaceSchema } from 'modules/character/schemas/race.schema'
import { BaseAbilitiesSchema } from 'modules/character/schemas/baseAbilities.schema'
import { CharacterState } from 'common/modules/character/redux'
import { ClassMapSchema } from 'modules/character/schemas/class.schema'

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
export class CharacterSchema implements CharacterState {
  _id!: string

  @prop({ required: true, ref: UserSchema, index: true })
  userId!: string

  @prop({ required: true })
  name!: string

  @prop()
  baseAbilities?: BaseAbilitiesSchema

  @prop()
  createdAt?: number

  @prop()
  updatedAt?: number

  @prop()
  race?: RaceSchema

  @prop()
  classes?: ClassMapSchema

  toObject!: () => CharacterDocument
}

export type CharacterDocument = Omit<
  DocumentType<CharacterSchema>,
  'toObject'
> & {
  toObject: () => CharacterDocument
}

export const Character = getModelForClass(CharacterSchema)
