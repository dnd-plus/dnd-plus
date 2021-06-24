import { modelOptions, mongoose, prop } from '@typegoose/typegoose'
import { dateUTCNow } from 'common/utils/dateUTCNow'
import { CharacterRaceState } from 'common/modules/character/redux'

@modelOptions({
  schemaOptions: {
    timestamps: {
      currentTime: dateUTCNow,
    },
    _id: false,
  },
})
export class RaceSchema implements CharacterRaceState {
  @prop({ required: true })
  type!: string

  @prop({ type: mongoose.Schema.Types.Mixed })
  choices?: Record<string, unknown>

  @prop()
  createdAt?: number

  @prop()
  updatedAt?: number
}
