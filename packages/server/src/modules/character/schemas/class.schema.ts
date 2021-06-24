import { modelOptions, mongoose, prop } from '@typegoose/typegoose'
import { dateUTCNow } from 'common/utils/dateUTCNow'
import { CharacterClassState } from 'common/modules/character/redux'
import {
  CHARACTER_CLASS_NAMES,
  CharacterClassName,
} from 'common/types/base/character/CharacterClassName'

@modelOptions({
  schemaOptions: {
    timestamps: {
      currentTime: dateUTCNow,
    },
    _id: false,
  },
})
export class ClassSchema implements CharacterClassState {
  @prop({ required: true, enum: CHARACTER_CLASS_NAMES })
  type!: CharacterClassName

  @prop({ required: true, type: Number })
  level!: number[]

  @prop({ type: mongoose.Schema.Types.Mixed })
  choices?: Record<string, unknown>

  @prop()
  createdAt?: number

  @prop()
  updatedAt?: number
}

@modelOptions({ schemaOptions: { _id: false } })
export class ClassMapSchema {
  @prop()
  artificer?: ClassSchema

  @prop()
  barbarian?: ClassSchema

  @prop()
  bard?: ClassSchema

  @prop()
  cleric?: ClassSchema

  @prop()
  druid?: ClassSchema

  @prop()
  fighter?: ClassSchema

  @prop()
  monk?: ClassSchema

  @prop()
  paladin?: ClassSchema

  @prop()
  ranger?: ClassSchema

  @prop()
  rogue?: ClassSchema

  @prop()
  sorcerer?: ClassSchema

  @prop()
  warlock?: ClassSchema

  @prop()
  wizard?: ClassSchema
}
