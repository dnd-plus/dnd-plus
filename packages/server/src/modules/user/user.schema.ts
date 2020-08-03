import {
  getModelForClass,
  modelOptions,
  plugin,
  prop,
} from '@typegoose/typegoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'

@modelOptions({
  options: {
    customName: 'User',
  },
})
@plugin(uniqueValidator)
class UserSchema {
  @prop({ required: true, unique: true })
  email!: string

  @prop({ required: true, unique: true })
  login!: string

  @prop({ required: true })
  passwordHash!: string

  async setPassword(password: string) {
    this.passwordHash = await bcrypt.hash(password, 10)
  }

  async checkPassword(password: string) {
    return await bcrypt.compare(password, this.passwordHash)
  }
}

export const User = getModelForClass(UserSchema)
