import {
  DocumentType,
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
export class UserSchema {
  @prop({ required: true, unique: true, select: false })
  email!: string

  @prop({ required: true, unique: true })
  login!: string

  @prop({ required: true, select: false })
  passwordHash!: string

  async setPassword(password: string) {
    this.passwordHash = await bcrypt.hash(password, 10)
  }

  async checkPassword(password: string) {
    return await bcrypt.compare(password, this.passwordHash)
  }
}

export type UserDocument = DocumentType<UserSchema>

export const User = getModelForClass(UserSchema)
