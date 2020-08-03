import {
  getModelForClass,
  modelOptions,
  plugin,
  prop,
} from '@typegoose/typegoose'
import uniqueValidator from 'mongoose-unique-validator'

@modelOptions({
  options: {
    customName: 'Character',
  },
})
@plugin(uniqueValidator)
class UserSchema {
  @prop({ required: true, unique: true })
  name!: string
}

export const Character = getModelForClass(UserSchema)
