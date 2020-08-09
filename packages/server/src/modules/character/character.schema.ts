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
  createdAt!: number

  @prop()
  updatedAt!: number
}

export type CharacterDocument = DocumentType<CharacterSchema>

export const Character = getModelForClass(CharacterSchema)
