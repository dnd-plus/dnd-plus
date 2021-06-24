import { modelOptions, prop } from '@typegoose/typegoose'
import { dateUTCNow } from 'common/utils/dateUTCNow'
import {
  BASE_ABILITIES_STATE_TYPES,
  BaseAbilitiesState,
  BaseAbilitiesStateType,
} from 'common/modules/character/redux'
import { AbilitiesMap } from 'common/reference/AbilityType'

@modelOptions({ schemaOptions: { _id: false } })
class AbilitiesSchema implements Partial<AbilitiesMap> {
  @prop()
  strength?: number

  @prop()
  dexterity?: number

  @prop()
  constitution?: number

  @prop()
  intelligence?: number

  @prop()
  wisdom?: number

  @prop()
  charisma?: number
}

@modelOptions({
  schemaOptions: {
    timestamps: {
      currentTime: dateUTCNow,
    },
    _id: false,
  },
})
export class BaseAbilitiesSchema implements BaseAbilitiesState {
  @prop({ required: true, type: String, enum: BASE_ABILITIES_STATE_TYPES })
  type!: BaseAbilitiesStateType

  @prop({ required: true })
  abilities!: AbilitiesSchema

  @prop()
  createdAt?: number

  @prop()
  updatedAt?: number
}
